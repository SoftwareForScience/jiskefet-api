/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { InfoLoggerService } from '../services/infologger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoLogger } from '../entities/infologger.entity';
import { TimeUtility } from '../utility/time.utility';

@Global()
@Module({
        imports: [TypeOrmModule.forFeature([InfoLogger]), TypeOrmModule.forRoot({
            name: 'infologger',
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'INFOLOGGER',
            synchronize: true,
            logging: true})],
    providers: [InfoLoggerService, TimeUtility],
    exports: [InfoLoggerService],
})
export class InfoLoggerModule { }
