/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable, Inject } from '@nestjs/common';
import * as oauth2 from 'simple-oauth2';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SubSystemPermissionService } from './subsystem_permission.service';
import { BCryptService } from './bcrypt.service';
import { OptionsWithUrl } from 'request-promise';
import { AuthService } from '../abstracts/auth.service.abstract';
import InvalidSettingException from '../exceptions/InvalidSettingException';

/**
 * Handles authorization via CERN OAuth2.
 */
@Injectable()
export class CernAuthService extends AuthService {

    private cernRegisteredURI: string;

    constructor(
        @Inject(UserService) userService: UserService,
        @Inject(SubSystemPermissionService) subSystemPermissionService: SubSystemPermissionService,
        @Inject(BCryptService) bcryptService: BCryptService,
        @Inject(JwtService) jwtService: JwtService,
    ) {
        super(userService, subSystemPermissionService, bcryptService, jwtService);
        // set oAuth credentials
        this.oAuth2Config.client.id = process.env.CLIENT_ID;
        this.oAuth2Config.client.secret = process.env.CLIENT_SECRET;

        if (process.env.CERN_REGISTERED_URI === undefined
            || process.env.CERN_REGISTERED_URI === '') {
            throw new InvalidSettingException('CERN_REGISTERED_URI must be filled in');
        }

        this.cernRegisteredURI = process.env.CERN_REGISTERED_URI;

        // set resource host
        this.oAuth2Config.auth.tokenHost = 'https://oauth.web.cern.ch/';
        this.oAuth2Config.auth.tokenPath = 'Oauth/Token';

        this.oAuth2Client = oauth2.create(this.oAuth2Config);
    }

    /**
     * POST to authorization server, requesting an access token
     * by giving the authorization grant (code).
     * @param code authorization grant code
     */
    protected async getToken(code: string): Promise<string> {
        try {

            // This line will return a 400 Bad Request error (Invalid grant)
            const authorizationGrant =
                await this.oAuth2Client.authorizationCode.getToken({
                    code,
                    redirect_uri: this.cernRegisteredURI
                    } as any);
            const accessTokenObject = await this.oAuth2Client.accessToken.create(authorizationGrant);

            if (!accessTokenObject.token.access_token) {
                throw new Error(accessTokenObject.token.error_description ||
                    'Cannot get access token: Authentication Server did not accept grant given.');
            }

            return accessTokenObject.token.access_token;
        } catch (exception) {
            console.log(exception);
            throw new Error('The OAuth server did something unexpected, is OAuth properly setup?');
        }
    }

    /**
     * Returns options needed to make a request to the OAuth provider's resource server.
     * @param accessToken
     */
    protected async getApiRequest(accessToken: string): Promise<OptionsWithUrl> {
        return {
            url: 'https://oauthresource.web.cern.ch/api/User',
            headers: {
                'User-Agent': 'Jiskefet',
                'Authorization': `bearer ${accessToken}`
            }
        };
    }
}
