/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import * as oauth2 from 'simple-oauth2';
import { ConfigService } from './config.service';

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

let OAuth2;
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
        OAuth2 = oauth2.create(credentials);

        authorizationUri = OAuth2.authorizationCode.authorizeURL({
            redirect_uri: config.get('REDIRECT_URI'),
            // lookup what scope and state is used for
            // scope: '<scope>',
            // state: '<state>'
        });
    }

    // lookup type definition
    async auth(req: any, res: any) {
        console.log(`authorization uri is: ${authorizationUri}`);
        res.redirect(authorizationUri);
    }

    async callback(req: any, res: any) {
        const code = req.query.code;
        console.log(`code is: ${code}`);
        const options = {
            code,
        };

        try {
            const result = await oauth2.authorizationCode.getToken(options);

            console.log(`The resulting token is: ${result}`);

            const token = oauth2.accessToken.create(result);
            const dtoken = token.token.access_token;
            console.log(dtoken);
            const getCall = {
                url: 'https://api.github.com/user?access_token=' + dtoken,
                headers: {
                    'User-Agent': 'request'
                }
            };
            const requestap = require('request');
            requestap(getCall, (error, response, body) => {
                res.send('Hallo : ' + JSON.parse(body).name);
                res.status(200);

                console.log(body);
            });

            // return res.status(200).json(token)
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
