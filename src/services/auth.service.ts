/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as request from 'request';
import * as oauth2 from 'simple-oauth2';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/create.user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/user.entity';
import { access } from 'fs';

@Injectable()
export class AuthService {
    private oAuth2Client: oauth2.OAuthClient;
    private cookieName = 'token';

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
        // set client
        this.oAuth2Config.client.id = process.env.CLIENT_ID;
        this.oAuth2Config.client.secret = process.env.CLIENT_SECRET;

        // set authentication host
        this.oAuth2Config.auth.tokenHost = process.env.AUTH_TOKEN_HOST;
        this.oAuth2Config.auth.tokenPath = process.env.AUTH_TOKEN_PATH;

        // initialize
        this.oAuth2Client = oauth2.create(this.oAuth2Config);
    }

    public async signIn(token: string): Promise<string> {
        // In the real-world app you shouldn't expose this method publicly
        // instead, return a token once you verify user credentials
        const user: JwtPayload = { token };
        return this.jwtService.sign(user);
    }

    public async validateUserJwt(payload: JwtPayload): Promise<any> {
        console.log('payload:');
        console.log(payload);
        return await this.userService.findOneByToken(payload.token);
    }

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
            const jwt = await this.signIn(accessToken);

            console.log('\naccessToken: ' + accessToken);
            console.log('\njwt: ' + jwt);

            // ~Begin Validate user, extract to separate function eventually
            const user = await this.userService.findOneByToken(accessToken);
            if (!user) {
                console.log('No user found in db with jwt token given. Request user info from GitHub...');
                await this.getResource(await accessToken, async (returnedUser: CreateUserDto) => {
                    console.log('User from GitHub:');
                    console.log(returnedUser);
                    // returnedUser.token = jwt;
                    this.userService.saveUser(returnedUser);
                    const realUser: User = await this.userService.findOneByToken(accessToken);
                    console.log('realUser:');
                    console.log(realUser);
                    if (!realUser) {
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
        request(getCall, (error, response, body) => {
            const jsonBody = JSON.parse(body);
            // res.send(jsonBody);
            // res.status(200);
            const tempUser: CreateUserDto = {
                externalUserId: jsonBody.id,
                token: accessToken,
                avatarUrl: jsonBody.avatar_url
            };
            callback(tempUser);
        });
    }

    public async logout(res: Response) {
        // res.clearCookie(this.cookieName);
        // return res.redirect(process.env.HOME_URI);
    }

    // public async validateUser(token: string, user: CreateUserDto): Promise<User> {
    //     const foundUser = await this.userService.findOneByToken(token);
    //     if (!foundUser) {
    //         this.userService.saveUser(user);
    //     }
    //     return await this.userService.findOneByToken(token);
    // }
    /**
     * POST to authorization server for token by giving the authorization grant (code).
     * @param code string
     */
    private async getToken(code: string): Promise<string> {
        const authorizationGrant = await this.oAuth2Client.authorizationCode.getToken({ code } as any);
        const accessTokenObject = await this.oAuth2Client.accessToken.create(authorizationGrant);
        if (!accessTokenObject.token.access_token) {
            throw new Error('Cannot get access token: GitHub did not accept grant given.');
        }
        return accessTokenObject.token.access_token;
    }
}
