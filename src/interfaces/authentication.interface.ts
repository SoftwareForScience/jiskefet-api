/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { CreateUserDto } from '../dtos/create.user.dto';
import { UserProfile } from '../abstracts/userprofile.abstract';
import { JwtPayload } from './jwt-payload.interface';

export interface Authentication {
    sign: (payload: JwtPayload) => Promise<string>;
    signSubSystem: (payload: JwtPayload) => Promise<any>;
    validateSubSystemJwt: (payload: JwtPayload) => Promise<any>;
    validateJwt: (jwtToken: string) => Promise<any>;
    auth: (grant: string) => Promise<string>;
    getResource: (accessToken: string) => Promise<CreateUserDto>;
    getProfileInfo: (jwt: string) => Promise<UserProfile>;
}
