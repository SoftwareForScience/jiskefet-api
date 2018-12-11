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
import { AuthService } from '../abstracts/auth.service.abstract';

/**
 * A PassportStrategy that verifies JWT's.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        if (!payload.is_subsystem) {
            // Does not require additional validation for non-subsystems, i.e. users.
            return true;
        } else {
            // Requires additional validation for subsystems.
            const subSystem = await this.authService.validateSubSystemJwt(payload);
            if (!subSystem) {
                throw new UnauthorizedException();
            }
            return subSystem;
        }
    }
}
