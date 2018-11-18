/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Strategy } from 'passport-cookie';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    // TODO: rename cookie
    // Cookie strategy only fires when a request contains a cookie with the name 'token'
    async validate(token: string) {
        // console.log('hit cookie strategy');
        // const user = await this.authService.validateUser(token);
        // if (!user) {
        //     throw new UnauthorizedException();
        // }
        // return user;
    }
}
