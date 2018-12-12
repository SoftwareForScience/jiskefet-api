/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { CreateUserDto } from '../dtos/create.user.dto';
import { UserProfile } from './userprofile.abstract';
import { Authentication } from '../interfaces/authentication.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import * as oauth2 from 'simple-oauth2';
import { UserService } from '../services/user.service';
import { SubSystemPermissionService } from '../services/subsystem_permission.service';
import { BCryptService } from '../services/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { OptionsWithUrl } from 'request-promise';
import * as RequestPromise from 'request-promise';

/**
 * Handles authorization via OAuth 2.
 */
export abstract class AuthService implements Authentication {

    protected oAuth2Client: oauth2.OAuthClient;
    protected oAuth2Config: oauth2.ModuleOptions = {
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
        protected readonly userService: UserService,
        protected readonly subSystemPermissionService: SubSystemPermissionService,
        protected readonly bcryptService: BCryptService,
        protected readonly jwtService: JwtService,
    ) { }

    /**
     * Creates a JWT for a user that expires in specified time
     * @param {String} payload JWT payload
     */
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
    protected abstract getToken(code: string): Promise<string>;

    /**
     * Returns options needed to make a request to the OAuth provider's resource server.
     * @param accessToken
     */
    protected abstract getApiRequest(accessToken: string): Promise<OptionsWithUrl>;

}
