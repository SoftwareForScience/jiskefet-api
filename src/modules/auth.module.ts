/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthUtility } from '../utility/auth.utility';
import { AuthContoller } from '../controllers/auth.controller';

@Global()
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRE_TIME,
            },
        }),
    ],
    providers: [AuthService, JwtStrategy, AuthUtility],
    controllers: [AuthContoller],
    exports: [AuthModule],
})
export class AuthModule {}
