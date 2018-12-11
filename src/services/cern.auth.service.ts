/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import * as oauth2 from 'simple-oauth2';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/create.user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { SubSystemPermissionService } from './subsystem_permission.service';
import { BCryptService } from './bcrypt.service';
import { GithubProfileDto } from '../dtos/github.profile.dto';
import * as RequestPromise from 'request-promise';
import { OptionsWithUrl } from 'request-promise';
import { UserProfile } from '../abstracts/userprofile.abstract';
import { AuthService } from '../abstracts/auth.service.abstract';

/**
 * Handles authorization via OAuth 2.
 */
@Injectable()
export class CernAuthService extends AuthService {

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

    constructor(
        private readonly userService: UserService,
        private readonly subSystemPermissionService: SubSystemPermissionService,
        private readonly bcryptService: BCryptService,
        private readonly jwtService: JwtService,
    ) {
        super();
        this.oAuth2Config.client.id = process.env.CERN_CLIENT_ID;
        this.oAuth2Config.client.secret = process.env.CERN_CLIENT_SECRET;

        // set resource host
        this.oAuth2Config.auth.tokenHost = process.env.CERN_AUTH_TOKEN_HOST;
        this.oAuth2Config.auth.tokenPath = process.env.CERN_AUTH_TOKEN_PATH;

        this.oAuth2Client = oauth2.create(this.oAuth2Config);
    }

    public async sign(payload: JwtPayload): Promise<string> {
        const token: JwtPayload = payload;
        return this.jwtService.sign(token);
    }

    /**
     * Creates a JWT for a subsystem that expires in specified time
     * @param {String} payload JWT payload
     */
    public async signSubSystem(payload: JwtPayload): Promise<string> {
        const token: JwtPayload = payload;
        return await this.jwtService.sign(token, { expiresIn: process.env.SUB_SYSTEM_TOKEN_EXPIRES_IN });
    }

    /**
     * Validates the subsystem against the database
     * @param {JwtPayload} payload JWT payload
     */
    public async validateSubSystemJwt(payload: JwtPayload): Promise<any> {
        const subSystem =
            await this.subSystemPermissionService.findSubSystemsPermissionsById(parseInt(payload.permission_id, 10));
        // now every request will be checked by bcrypt, which might result into a performance hit in the app.
        if (await this.bcryptService.checkToken(payload.token, subSystem.subSystemHash) === true) {
            return subSystem;
        }
        return null;
    }

    // TODO: incoming payload is only the body, not the whole JWT
    /**
     * Function to verify JWT without hitting the database
     * @param {String} jwtToken Encoded JWT
     */
    public async validateJwt(jwtToken: string): Promise<any> {
        const result: any = await this.jwtService.verify(jwtToken, { ignoreExpiration: true });
        return result;
    }

    /**
     * Authorize the user via GitHub by redirecting to GitHub's login page.
     * The user logs in via GitHub and GitHub does a GET on
     * our /callback endpoint with the authorization grant (or code).
     * Authorize the user via the OAuth 2 provider by exchanging the grant for an access token.
     * This token is then encoded as a JWT, exchanged for a user resource which is saved and finally returned.
     * @param response response
     * @returns JWT string.
     */
    public async auth(grant: string): Promise<string> {
        const accessToken = await this.getToken(grant);
        const jwt = this.jwtService.sign({ token: accessToken } as JwtPayload);
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
        const requestOptions = await this.getApiRequest(accessToken);
        return RequestPromise(requestOptions).then((body) => {
            const jsonBody = JSON.parse(body);
            const createUserDto: CreateUserDto = {
                externalUserId: jsonBody.id
            };
            return createUserDto;
        }).catch((error) => {
            throw new Error(error);
        });
    }

    /**
     * Request user's GitHub profile info from resource server.
     * @param jwt
     */
    public async getProfileInfo(jwt: string): Promise<UserProfile> {
        const decodedJwt = this.jwtService.decode(jwt, { json: true }) as { [key: string]: string };
        const accessToken = decodedJwt.token;
        const requestOptions = await this.getApiRequest(accessToken);

        return RequestPromise(requestOptions).then((body) => {
            return JSON.parse(body);
        }).catch((error) => {
            throw new Error(error);
        });
    }

    /**
     * POST to authorization server, requesting an access token
     * by giving the authorization grant (code).
     * @param code authorization grant code
     */
    private async getToken(code: string): Promise<string> {
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
    private async getApiRequest(accessToken: string): Promise<OptionsWithUrl> {
        return {
            url: process.env.CERN_RESOURCE_API_URL,
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${accessToken}`
            }
        };
    }
}
