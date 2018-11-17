/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 *
 * With the ConfigService class you can read specific values
 * from an .env file in any class (if injected) with the following syntax configService.get('Key')
*/

import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string) {
        if (process.env.NODE_ENV) {
            this.envConfig = dotenv.parse(fs.readFileSync(filePath));
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
