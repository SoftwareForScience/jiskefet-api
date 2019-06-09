/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import { Setting } from '../interfaces/setting.interface';
import { USE_CERN_SSO, CLIENT_ID, AUTH_REDIRECT_URI, FILE_UPLOAD_LIMIT } from '../constants';

@Injectable()
export class SettingService {

    async getSettings(): Promise<Setting> {
        if (USE_CERN_SSO === 'true') {
            return {
                ['API_VERSION']: (global as any).apiVersion,
                ['FILE_UPLOAD_LIMIT']: FILE_UPLOAD_LIMIT.toString(),
                ['USE_CERN_SSO']: USE_CERN_SSO,
                ['AUTH_URL']:
                    `https://oauth.web.cern.ch/OAuth/Authorize?response_type=code`
                    + `&client_id=${CLIENT_ID}&redirect_uri=${AUTH_REDIRECT_URI}`,
            };
        }
        return {
            ['API_VERSION']: (global as any).apiVersion,
            ['FILE_UPLOAD_LIMIT']: FILE_UPLOAD_LIMIT.toString(),
            ['USE_CERN_SSO']: USE_CERN_SSO,
            ['AUTH_URL']:
                `https://github.com/login/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&`
                + `redirect_uri=${AUTH_REDIRECT_URI}`
        };
    }
}
