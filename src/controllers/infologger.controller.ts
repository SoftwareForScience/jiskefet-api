/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiUseTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { InfoLoggerService } from '../services/infologger.service';
// import { InfoLoggerProtocols } from '../interfaces/infologger.interface';
// tslint:disable-next-line:no-var-requires
const InfoLoggerProtocols = require('../interfaces/infologger.interface');

@ApiUseTags('infologger')
@Controller('infologger')
export class InfoLoggerController {

    constructor(private readonly infoLogger: InfoLoggerService) { }

    /**
     * Formats an log object into InfoLogger log frame
     * @param {object} fields log object
     * @param {string} version protocol version
     * @return {string} InfoLogger protocol frame
     */
    format(fields: any, version: string = '1.4'): string {
        let stringLog = '*' + version;
        fields.system = fields.system || 'Web';
        fields.facility = fields.facility || `Node ${process.version}`;
        const currentProtocol = InfoLoggerProtocols.find((protocol) => protocol.version === version);
        currentProtocol.fields.forEach((field) => {
            stringLog += '#';
            if (typeof fields[field.name] !== 'undefined') {
                stringLog += fields[field.name];
            }
        });
        return stringLog + '\n';
    }

    // @Post()
    // createInfoLog(message: string): Promise<void> {
    //     return this.infoLogger.log(this.format(message));
    // }

    // @Post()
    // createWarningLog(message: string): Promise<void> {
    //     return this.infoLogger.warn(this.format(message));
    // }

    // @Post()
    // createErrorLog(message: string): Promise<void> {
    //     return this.infoLogger.error(this.format(message));
    // }

}
