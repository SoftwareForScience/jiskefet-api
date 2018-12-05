/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Logger, LoggerService, Injectable } from '@nestjs/common';
import { createConnection, getConnection, Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class InfoLoggerService implements LoggerService {
    constructor(
        @InjectConnection('infologger')
        private readonly connection: Connection
    ) {}
    // private connection: Promise<Connection> = createConnection('infologger');
    // private infoLoggerDbConnection: Connection = getConnection('infologger');

    async log(message: string): Promise<void> {
        console.log('Hit info logger service \n' + message);
        // might be needed
        // this.infoLoggerDbConnection.connect();
        const createLogConnection = await this.connection;
        createLogConnection.createQueryBuilder()
            .insert()
            .into('messages')
            .values(message)
            .execute();
        console.log('Still running?');
        // super.log(message);
    }

    async warn(message: string): Promise<void> {
        console.log('Hit warning logger service \n ' + message);
        const createLogConnection = await this.connection;
        createLogConnection.createQueryBuilder()
            .insert()
            .into('message')
            .values(message);
        console.log('Still running?');
    }

    async error(message: string): Promise<void> {
        console.log('Hit error logger service \n' + message);
        const createLogConnection = await this.connection;
        createLogConnection.createQueryBuilder()
            .insert()
            .into('message')
            .values(message);
        console.log('Still running?');
    }
}
