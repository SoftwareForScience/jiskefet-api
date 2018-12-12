/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Injectable } from '@nestjs/common';
import { Headers } from 'request';
import * as cookie from 'cookie';

/**
 * Utility class relating to authentication.
 */
@Injectable()
export class AuthUtility {
    /**
     * Returns the JWT from the headers of a request object.
     * @param headers
     */
    public async getJwtFromHeaders(headers: Headers): Promise<string | null> {
        let jwt;
        if (headers.authorization) { // Get JWT from authorization header
            jwt = headers.authorization.split(' ')[1];
        } else if (headers.cookie) { // Get JWT from cookies
            const cookies = cookie.parse(headers.cookie);
            jwt = cookies.token;
        } else {
            return null;
        }
        return jwt;
    }
}
