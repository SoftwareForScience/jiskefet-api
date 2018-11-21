/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../services/auth.service';
import { User } from '../entities/user.entity';

/**
 * A PassportStrategy that verifies JWT's.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        });
    }

    /**
     * Validate a JWT by checking if a user exists with the JWT given.
     * This is an additional check besides verifying the JWT itself.
     * @param payload The JWT.
     */
    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.authService.validateUserJwt(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
