/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import * as oauth2 from 'simple-oauth2';
import { CreateUserDto } from '../dtos/create.user.dto';
import { OptionsWithUrl } from 'request-promise';
import { UserProfile } from './userprofile.abstract';
import { Authentication } from '../interfaces/authentication.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

/**
 * Handles authorization via OAuth 2.
 */
@Injectable()
export abstract class AuthService implements Authentication {

    public oAuth2Client: oauth2.OAuthClient;
    public oAuth2Config: oauth2.ModuleOptions = {
        client: {
            id: '<id>',
            secret: '<secret>'
        },
        auth: {
            tokenHost: '<token_host>',
            tokenPath: '<token_path>',
        }
    };

    constructor() {
        // set client credentials depending of github or cern SSO
        if (process.env.USE_CERN_SSO) {
            this.oAuth2Config.client.id = process.env.CERN_CLIENT_ID;
            this.oAuth2Config.client.secret = process.env.CERN_CLIENT_SECRET;

            // set resource host
            this.oAuth2Config.auth.tokenHost = process.env.CERN_AUTH_TOKEN_HOST;
            this.oAuth2Config.auth.tokenPath = process.env.CERN_AUTH_TOKEN_PATH;
        } else {
            this.oAuth2Config.client.id = process.env.GITHUB_CLIENT_ID;
            this.oAuth2Config.client.secret = process.env.GITHUB_CLIENT_SECRET;

            // set resource host
            this.oAuth2Config.auth.tokenHost = process.env.GITHUB_AUTH_TOKEN_HOST;
            this.oAuth2Config.auth.tokenPath = process.env.GITHUB_AUTH_TOKEN_PATH;
        }
        this.oAuth2Client = oauth2.create(this.oAuth2Config);
    }

    abstract sign(payload: JwtPayload): Promise<string>;

    abstract signSubSystem(payload: JwtPayload): Promise<any>;

    abstract validateSubSystemJwt(payload: JwtPayload): Promise<any>;

    abstract validateJwt(jwtToken: string): Promise<any>;

    abstract auth(grant: string): Promise<string>;

    abstract getResource(accessToken: string): Promise<CreateUserDto>;

    abstract getProfileInfo(jwt: string): Promise<UserProfile>;

}
