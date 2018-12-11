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

/**
 * Handles authorization via OAuth 2.
 */
export abstract class AuthService implements Authentication {

    abstract sign(payload: JwtPayload): Promise<string>;

    abstract signSubSystem(payload: JwtPayload): Promise<any>;

    abstract validateSubSystemJwt(payload: JwtPayload): Promise<any>;

    abstract validateJwt(jwtToken: string): Promise<any>;

    abstract auth(grant: string): Promise<string>;

    abstract getResource(accessToken: string): Promise<CreateUserDto>;

    abstract getProfileInfo(jwt: string): Promise<UserProfile>;

}
