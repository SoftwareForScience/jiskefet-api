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

/**
 * Handles authorization via Github OAuth2.
 */
@Injectable()
export class GithubAuthService extends AuthService {

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

        // set resource host
        this.oAuth2Config.auth.tokenHost = 'https://github.com';
        this.oAuth2Config.auth.tokenPath = '/login/oauth/access_token';

        this.oAuth2Client = oauth2.create(this.oAuth2Config);
    }

    /**
     * POST to authorization server, requesting an access token
     * by giving the authorization grant (code).
     * @param code authorization grant code
     */
    protected async getToken(code: string): Promise<string> {
        const authorizationGrant =
            await this.oAuth2Client.authorizationCode.getToken({ code } as oauth2.AuthorizationTokenConfig);
        const accessTokenObject = await this.oAuth2Client.accessToken.create(authorizationGrant);
        if (!accessTokenObject.token.access_token) {
            throw new Error(accessTokenObject.token.error_description ||
                'Cannot get access token: Authentication Server did not accept grant given.');
        }
        return accessTokenObject.token.access_token;
    }

    /**
     * Returns options needed to make a request to the OAuth provider's resource server.
     * @param accessToken
     */
    protected async getApiRequest(accessToken: string): Promise<OptionsWithUrl> {
        return {
            url: 'https://api.github.com/user',
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${accessToken}`
            }
        };
    }
}
