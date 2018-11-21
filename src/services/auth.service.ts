/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import * as RequestPromise from 'request-promise';
import * as oauth2 from 'simple-oauth2';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/create.user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/user.entity';

/**
 * Handles authorization via OAuth 2.
 */
@Injectable()
export class AuthService {
    private oAuth2Client: oauth2.OAuthClient;

    private oAuth2Config: oauth2.ModuleOptions = {
        client: {
            id: '<id>',
            secret: '<secret>'
        },
        auth: {
            tokenHost: '<token_host>',
            tokenPath: '<token_path>',
        }
    };

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
        // set client credentials
        this.oAuth2Config.client.id = process.env.CLIENT_ID;
        this.oAuth2Config.client.secret = process.env.CLIENT_SECRET;

        // set resource host
        this.oAuth2Config.auth.tokenHost = process.env.AUTH_TOKEN_HOST;
        this.oAuth2Config.auth.tokenPath = process.env.AUTH_TOKEN_PATH;

        this.oAuth2Client = oauth2.create(this.oAuth2Config);
    }

    /**
     * Returns the user that the JWT belongs to.
     * @param payload JWT
     */
    public async validateUserJwt(payload: JwtPayload): Promise<User> {
        return await this.userService.findOneByToken(payload.token);
    }

    /**
     * Authorize the user via the OAuth 2 provider by exchanging the grant for an access token.
     * This token is then encoded as a JWT, exchanged for a user resource which is saved and finally returned.
     * @param response response
     * @returns JWT string.
     */
    public async auth(grant: string): Promise<string> {
        const accessToken = await this.getToken(grant);
        const jwt = this.jwtService.sign({ token: accessToken } as JwtPayload);

        console.log('\naccessToken: ' + accessToken);
        console.log('\njwt: ' + jwt);

        const user: CreateUserDto = await this.getResource(accessToken);
        await this.userService.saveUser(user);
        return jwt;
    }

    /**
     * Ask the resource server for user info by giving access token.
     * @param accessToken Access token (non JWT)
     * @param res response object
     */
    public async getResource(accessToken: string): Promise<CreateUserDto> {
        const getCall = {
            url: 'https://api.github.com/user?access_token=' + accessToken,
            headers: {
                'User-Agent': 'request'
            }
        };

        // const getCall = {
        //     url: process.env.RESOURCE_API_URL,
        //     headers: {
        //         'User-Agent': 'request',
        //         'Authorization': `token ${accessToken}`
        //     }
        // };
        return RequestPromise(getCall).then((body) => {
            const jsonBody = JSON.parse(body);
            const createUserDto: CreateUserDto = {
                externalUserId: jsonBody.id,
                token: accessToken,
                avatarUrl: jsonBody.avatar_url
            };
            return createUserDto;
        }).catch((error) => {
            throw new Error(error);
        });
    }

    /**
     * POST to authorization server for token by giving the authorization grant (code).
     * @param code string
     */
    private async getToken(code: string): Promise<string> {
        const authorizationGrant = await this.oAuth2Client.authorizationCode.getToken({ code } as oauth2.AuthorizationTokenConfig);
        const accessTokenObject = await this.oAuth2Client.accessToken.create(authorizationGrant);
        if (!accessTokenObject.token.access_token) {
            throw new Error(accessTokenObject.token.error_description ||
                'Cannot get access token: Authentication Server did not accept grant given.');
        }
        return accessTokenObject.token.access_token;
    }
}
