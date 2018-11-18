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


@Injectable()
export class AuthService {
    private oAuth2Client: oauth2.OAuthClient;
    private authorizationUri: string;
    private cookieName = 'token';

    private oAuth2Config: oauth2.ModuleOptions = {
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

    constructor(private readonly userService: UserService) {
        // set client
        this.oAuth2Config.client.id = process.env.CLIENT_ID;
        this.oAuth2Config.client.secret = process.env.CLIENT_SECRET;

        // set authentication host
        this.oAuth2Config.auth.tokenHost = process.env.AUTH_TOKEN_HOST;
        this.oAuth2Config.auth.tokenPath = process.env.AUTH_TOKEN_PATH;
        this.oAuth2Config.auth.authorizePath = process.env.AUTH_PATH;

        // initialize
        this.oAuth2Client = oauth2.create(this.oAuth2Config);
        this.authorizationUri = this.oAuth2Client.authorizationCode.authorizeURL({
            redirect_uri: process.env.CALLBACK_URI,
            // used to limit access to resources, e.g. ['READ', 'WRITE'] https://www.oauth.com/oauth2-servers/scope/defining-scopes/
            // scope: '<scope>',
            // state prevents CSRF attacks https://security.stackexchange.com/questions/104167/what-to-use-as-state-in-oauth2-authorization-code-grant-workflow
            state: process.env.AUTH_STATE,
        });
    }

    /**
     * Authorize the user via GitHub by redirecting to GitHub's login page.
     * The user logs in via GitHub and GitHub does a GET on
     * our /callback endpoint with the authorization grant (or code).
     * @param response response
     */
    public async auth(response: Response) {
        response.redirect(this.authorizationUri);
    }

    /**
     * Called by GitHub's auth server. GitHub returns an authorization grant (code) in the query parameters.
     * @param req request made by github
     * @param res response
     */
    public async callback(req: Request, res: Response): Promise<void> {
        try {
            const authGrant: string = req.query.code;
            const accessToken = await this.getToken(authGrant);
            await this.getResource(accessToken, res, (user: CreateUserDto) => {
                this.validateUser(user);
            });
        } catch (error) {
            // console.error(`Access Token Error ${error.message}`);
            throw res.status(500).json('Authentication failed');
        }
    }

    /**
     * Ask resource server for user info by giving access token.
     * @param token Access token
     * @param res response object
     */
    public async getResource(token: string, res: Response, callback: (user: CreateUserDto) => void): Promise<void> {
        const getCall = {
            url: 'https://api.github.com/user?access_token=' + token,
            headers: {
                'User-Agent': 'request'
            }
        };
        request(getCall, (error, response, body) => {
            const jsonBody = JSON.parse(body);
            res.send(jsonBody);
            res.status(200);
            const tempUser: CreateUserDto = {
                externalUserId: jsonBody.id,
                token,
                avatarUrl: jsonBody.avatar_url
            };
            callback(tempUser);
        });
    }

    public async logout(res: Response) {
        res.clearCookie(this.cookieName);
        return res.redirect(process.env.HOME_URI);
    }

    public async validateUser(tempUser: CreateUserDto): Promise<void> {
         // only send save user request if it has an external id
        console.log('tempUser inside validateUser');

        console.log(tempUser);

        await this.userService.saveUser(tempUser);

        // if (tempUser && tempUser.externalUserId) {
        //     // await this.userService.saveUser(tempUser);
        //         // this.validateUser(token);

        //     // await response.set('Authorization', `Bearer ${token}`);
        //     // await response.cookie(this.cookieName, `${token}`);
        //     // return await response.redirect(process.env.REDIRECT_URI);
        //     //     // res.send({
        //     //     //     success: true,
        //     //     //     innerAccessToken
        //     //     // });

        // }
        // // Validate if token passed along with HTTP request
        // // is associated with any registered account in the database
        // return await this.userService.findUserByToken(token);
    }

    /**
     * POST to authorization server for token by giving the authorization grant (code).
     * @param code string
     */
    private async getToken(code: string): Promise<string> {
        const authorizationGrant = await this.oAuth2Client.authorizationCode.getToken({ code } as any);
        const accessTokenObject = await this.oAuth2Client.accessToken.create(authorizationGrant);
        return accessTokenObject.token.access_token;
    }
}
