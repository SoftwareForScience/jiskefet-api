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

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'bearer' })],
    providers: [AuthService, HttpStrategy],
    exports: [AuthModule],
})

export class AuthModule {}
