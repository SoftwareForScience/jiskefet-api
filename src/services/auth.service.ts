/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as request from 'request';
import * as oauth2 from 'simple-oauth2';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/create.user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/user.entity';
import { SubSystemPermissionService } from './subsystem_permission.service';
import { BCryptService } from './bcrypt.service';

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
        private readonly subSystemPermissionService: SubSystemPermissionService,
        private readonly bcryptService: BCryptService,
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

    public async sign(payload: JwtPayload): Promise<string> {
        const token: JwtPayload = payload;
        return this.jwtService.sign(token);
    }

    /**
     * Creates a JWT for a subsystem that expires in specified time
     * @param payload string
     */
    public async signSubSystem(payload: JwtPayload): Promise<string> {
        const token: JwtPayload = payload;
        const expiresIn: string = process.env.SUB_SYSTEM_TOKEN_EXPIRES_IN;
        return this.jwtService.sign(token, { expiresIn });
    }

    public async validateUserJwt(payload: JwtPayload): Promise<any> {
        return await this.userService.findOneByToken(payload.token);
    }

    public async validateSubSystemJwt(payload: JwtPayload): Promise<any> {
        console.log('payload is:');
        console.log(payload);
        const subSystem =
            await this.subSystemPermissionService.findSubSystemsPermissionsById(parseInt(payload.permission_id, 10));
        console.log('sub system is');
        console.log(await subSystem);
        // now every request will be checked by bcrypt, which might result into a performance hit in the app.
        if (await this.bcryptService.checkToken(payload.token, subSystem.subSystemHash) === true) {
            return subSystem;
        }
        return null;
    }

    // /**
    //  * Function to verify JWT without hitting the database
    //  * @param payload string
    //  */
    // public async validateJwt(payload: string): Promise<any> {
    //     // check for exp maybe?
    //     const result: any = await this.jwtService.verify(payload, { ignoreExpiration: true });
    //     // if exp time is near, refresh/extend it using the refresh token
    //     console.log('result is:');
    //     console.log(await result);
    //     console.log(`type is ${typeof (await result)}`);
    //     return await this.jwtService.verify(payload);
    // }

    /**
     * Authorize the user via GitHub by redirecting to GitHub's login page.
     * The user logs in via GitHub and GitHub does a GET on
     * our /callback endpoint with the authorization grant (or code).
     * @param response response
     */
    public async auth(response: Response, grant: string) {
        if (!grant) {
            throw response.status(500).json('Authentication failed, please provide an Authorization Grant as a query param.');
        }
        try {
            const accessToken = await this.getToken(grant);
            const jwt = await this.sign({ accessToken });

            console.log('\naccessToken: ' + accessToken);
            console.log('\njwt: ' + jwt);

            // ~Begin Validate user, extract to separate function eventually
            const user = await this.userService.findOneByToken(accessToken);
            if (!user) {
                await this.getResource(await accessToken, async (returnedUser: CreateUserDto) => {
                    this.userService.saveUser(returnedUser);
                    const foundUser: User = await this.userService.findOneByToken(accessToken);
                    if (!foundUser) {
                        throw response.status(500).json('Authentication failed, user not saved correctly.');
                    }
                });
            }
            response.send({ token: await jwt });
            // ~End validate user

        } catch (error) {
            throw response.status(500).json(`Authentication failed. ${error.message}`);
        }
    }

    /**
     * Ask resource server for user info by giving access token.
     * @param accessToken Access token
     * @param res response object
     */
    public async getResource(accessToken: string, callback: (user: CreateUserDto) => void): Promise<void> {
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

        request(getCall, (error, response, body) => {
            const jsonBody = JSON.parse(body);
            const createUserDto: CreateUserDto = {
                externalUserId: jsonBody.id,
                token: accessToken,
                avatarUrl: jsonBody.avatar_url
            };
            callback(createUserDto);
        });
    }

    public async logout() { }

    /**
     * POST to authorization server for token by giving the authorization grant (code).
     * @param code string
     */
    private async getToken(code: string): Promise<string> {
        const authorizationGrant = await this.oAuth2Client.authorizationCode.getToken({ code } as oauth2.AuthorizationTokenConfig);
        const accessTokenObject = await this.oAuth2Client.accessToken.create(authorizationGrant);
        if (!accessTokenObject.token.access_token) {
            throw new Error('Cannot get access token: GitHub did not accept grant given.');
        }
        return accessTokenObject.token.access_token;
    }
}
