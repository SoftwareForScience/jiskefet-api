/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { SubSystemPermissionModule } from './subsystem_permission.module';
import { SubSystemPermissionService } from '../services/subsystem_permission.service';
import { BCryptService } from '../services/bcrypt.service';
import { SubSystemModule } from './subsystem.module';
import { SubSystemService } from '../services/subsystem.service';
import { AuthUtility } from '../utility/auth.utility';
import { GithubAuthService } from '../services/github.auth.service';
import { CernAuthService } from '../services/cern.auth.service';
import { AuthService } from '../abstracts/auth.service.abstract';

const authServiceProvider = {
    provide: AuthService,
    useClass: process.env.USE_CERN_SSO === 'true'
        ? CernAuthService
        : GithubAuthService,
};
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User]), SubSystemPermissionModule, SubSystemModule],
    providers: [UserService,
        SubSystemPermissionService,
        authServiceProvider,
        BCryptService,
        SubSystemService,
        AuthUtility],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }
