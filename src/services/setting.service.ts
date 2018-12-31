/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import { Setting } from '../interfaces/setting.interface';

@Injectable()
export class SettingService {

    async getSettings(): Promise<Setting> {
        return {
            ['API_URL']: process.env.API_URL,
            ['USE_CERN_SSO']: process.env.USE_CERN_SSO,
            ['GITHUB_AUTH_URL']: process.env.GITHUB_AUTH_URL,
            ['CERN_AUTH_URL']: process.env.CERN_AUTH_URL
        };
    }
}
