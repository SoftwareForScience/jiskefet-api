/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from '../strategies/http.strategy';
import { CookieStrategy } from '../strategies/cookie.strategy';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        // Todo: needs env vars for secretKey and expiration time
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        UserModule
    ],
    providers: [AuthService, HttpStrategy, CookieStrategy, JwtStrategy],
    exports: [AuthModule],
})

export class AuthModule {}
