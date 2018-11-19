/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogService } from '../services/log.service';
import { LogController } from '../controllers/log.controller';
import { Log } from '../entities/log.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    providers: [LogService],
    controllers: [LogController],
    exports: [LogService],
})

export class LogModule { }
