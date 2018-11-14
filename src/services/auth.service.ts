/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as oauth2 from 'simple-oauth2';
import * as request from 'request';

const credentials: oauth2.ModuleOptions = {
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

let OAuth2Instance;
let authorizationUri;

@Injectable()
export class AuthService {
    constructor(config: ConfigService) {
        // set client
        credentials.client.id = config.get('CLIENT_ID');
        credentials.client.secret = config.get('CLIENT_SECRET');

        // set authentication host
        credentials.auth.tokenHost = config.get('AUTH_TOKEN_HOST');
        credentials.auth.tokenPath = config.get('AUTH_TOKEN_PATH');
        credentials.auth.authorizePath = config.get('AUTH_PATH');

        // initialize
        OAuth2Instance = oauth2.create(credentials);

        authorizationUri = OAuth2Instance.authorizationCode.authorizeURL({
            redirect_uri: config.get('REDIRECT_URI'),
            // used to limit access to resources, e.g. ['READ', 'WRITE'] https://www.oauth.com/oauth2-servers/scope/defining-scopes/
            // scope: '<scope>',
            // state prevents CSRF attacks https://security.stackexchange.com/questions/104167/what-to-use-as-state-in-oauth2-authorization-code-grant-workflow
            state: config.get('AUTH_STATE'),
        });
    }

    // lookup type definition
    async auth(res: any) {
        console.log(`authorization uri is: ${authorizationUri}`);
        res.redirect(authorizationUri);
    }

    async callback(req: any, res: any) {
        const code = req.query.code;
        console.log(`code is: ${code}`);
        const options = {
            code
        };

        try {
            const result = await OAuth2Instance.authorizationCode.getToken(options);
            const accessTokenObject = OAuth2Instance.accessToken.create(result);
            console.log('created access token object is');
            console.log(accessTokenObject);

            const dtoken = accessTokenObject.token.access_token;
            console.log(`access_token is ${dtoken}`);
            const getCall = {
                url: 'https://api.github.com/user?access_token=' + dtoken,
                headers: {
                    'User-Agent': 'request'
                }
            };

            // mock request to retrieve user
            request(getCall, (error, response, body: any) => {
                res.status(200).send(JSON.parse(body));
                console.log(`error is: ${error}`);
                console.log('response is:');
                console.log(response);
                console.log(body);
            });

            // await res.status(200).json(accessTokenObject);
        } catch (error) {
            console.error(`Access Token Error ${error.message}`);
            return res.status(500).json('Authentication failed');
        }
    }

    async success(req: any, res: any) {
        console.log('success');
        res.send('');
    }
}
