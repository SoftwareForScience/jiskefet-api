/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import * as oauth2 from 'simple-oauth2';
import * as request from 'request';
import { Request, Response } from 'express';
import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/create.user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
    private oauth2Client;
    private authorizationUri;

    private oauth2config: oauth2.ModuleOptions = {
        client: {
            id: '<id>',
            secret: '<secret>'
        },
        auth: {
            tokenHost: '<token_host>',
            tokenPath: '<token_path>',
            authorizePath: '<authorize_path>'
        }
    };

    constructor(
        private readonly config: ConfigService,
        private readonly userService: UserService) {
        // set client
        this.oauth2config.client.id = this.config.get('CLIENT_ID');
        this.oauth2config.client.secret = this.config.get('CLIENT_SECRET');

        // set authentication host
        this.oauth2config.auth.tokenHost = this.config.get('AUTH_TOKEN_HOST');
        this.oauth2config.auth.tokenPath = this.config.get('AUTH_TOKEN_PATH');
        this.oauth2config.auth.authorizePath = this.config.get('AUTH_PATH');

        // initialize
        this.oauth2Client = oauth2.create(this.oauth2config);

        this.authorizationUri = this.oauth2Client.authorizationCode.authorizeURL({
            redirect_uri: this.config.get('CALLBACK_URI'),
            // used to limit access to resources, e.g. ['READ', 'WRITE'] https://www.oauth.com/oauth2-servers/scope/defining-scopes/
            // scope: '<scope>',
            // state prevents CSRF attacks https://security.stackexchange.com/questions/104167/what-to-use-as-state-in-oauth2-authorization-code-grant-workflow
            state: this.config.get('AUTH_STATE'),
        });
    }

    async auth(res: Response) {
        console.log(`authorization uri is: ${this.authorizationUri}`);
        res.redirect(this.authorizationUri);
    }

    async callback(req: Request, res: Response) {
        const code = req.query.code;
        console.log(`code is: ${code}`);
        const options = {
            code
        };

        try {
            const result = await this.oauth2Client.authorizationCode.getToken(options);
            const accessTokenObject = this.oauth2Client.accessToken.create(result);
            console.log('created access token object is');
            console.log(accessTokenObject);

            const innerAccessToken: string = accessTokenObject.token.access_token;
            console.log(`access_token is ${innerAccessToken}`);
            const getCall = {
                url: 'https://api.github.com/user?access_token=' + innerAccessToken,
                headers: {
                    'User-Agent': 'request'
                }
            };

            // mock request to retrieve user
            request(getCall, async (error, response, body: any) => {
                const jsonBody = JSON.parse(body);
                const tempUser: CreateUserDto = {
                    externalUserId: jsonBody.id,
                    token: innerAccessToken,
                    avatarUrl: jsonBody.avatar_url
                };
                console.log('mapped temporary user is: ');
                console.log(tempUser);
                // only send save user request if it has an external id
                if (tempUser.externalUserId) {
                    await this.userService.saveUser(tempUser).then(() => {
                        console.log(this.validateUser(innerAccessToken));
                    });
                }
                return res.redirect(this.config.get('REDIRECT_URI'));
            });
        } catch (error) {
            console.error(`Access Token Error ${error.message}`);
            return res.status(500).json('Authentication failed');
        }
    }

    async logout() {
    }

    async validateUser(token: string): Promise<User> {
        console.log('validating user');
        // Validate if token passed along with HTTP request
        // is associated with any registered account in the database
        return await this.userService.findUserByToken(token);
    }
}
