/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { SubSystemPermissionService } from '../services/subsystem_permission.service';
import { BCryptService } from '../services/bcrypt.service';
import { AuthUtility } from '../utility/auth.utility';
import { GithubAuthService } from '../services/github.auth.service';
import { CernAuthService } from '../services/cern.auth.service';
import { AuthService } from '../abstracts/auth.service.abstract';
import { AuthController } from '../controllers/auth.controller';
import { USE_CERN_SSO, JWT_SECRET_KEY, JWT_EXPIRE_TIME } from '../constants';
// Import dotenv so end-to-end tests can find the env variables.
import * as dotenv from 'dotenv';
dotenv.config();

const authServiceProvider = {
    provide: AuthService,
    useClass: USE_CERN_SSO === 'true'
        ? CernAuthService
        : GithubAuthService,
};
@Global()
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: JWT_SECRET_KEY,
            signOptions: {
                expiresIn: JWT_EXPIRE_TIME,
            },
        }),
    ],
    providers: [authServiceProvider, SubSystemPermissionService, BCryptService, JwtStrategy, AuthUtility],
    controllers: [AuthController],
    exports: [AuthModule],
})
export class AuthModule { }
