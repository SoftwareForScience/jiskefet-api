/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { InfoLogService } from '../services/infolog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoLog } from '../entities/infolog.entity';
import { TimeUtility } from '../utility/time.utility';

// Import dotenv so end-to-end tests can find the env variables.
import * as dotenv from 'dotenv';
dotenv.config();

let imports = [];

if (process.env.USE_INFO_LOGGER === 'true') {
    imports = [
        TypeOrmModule.forFeature([InfoLog]),
        TypeOrmModule.forRoot({
            name: 'infologger',
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'INFOLOGGER',
            synchronize: true,
            logging: true
        })
    ];
}

@Global()
@Module({
        imports: [
            ...imports
        ],
    providers: [InfoLogService, TimeUtility],
    exports: [InfoLogService],
})
export class InfoLogModule { }
