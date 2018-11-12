/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { AuthService } from '../services/auth.service';

@Module({
    imports: [ConfigModule],
    providers: [AuthService],
    exports: [AuthModule],
})

export class AuthModule { }
