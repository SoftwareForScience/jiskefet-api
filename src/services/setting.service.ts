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
        if (process.env.USE_CERN_SSO === 'true') {
            return {
                    ['USE_CERN_SSO']: process.env.USE_CERN_SSO,
                    ['AUTH_URL']:
                        `https://oauth.web.cern.ch/OAuth/Authorize?response_type=code`
                        + `&client_id=${process.env.CLIENT_ID}&redirect_uri=${ process.env.AUTH_REDIRECT_URI}`
            };
        }
        return {
                ['USE_CERN_SSO']: process.env.USE_CERN_SSO,
                ['AUTH_URL']:
                    `https://github.com/login/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&`
                    + `redirect_uri=${process.env.AUTH_REDIRECT_URI}`
        };
    }
}
