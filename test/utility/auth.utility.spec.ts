/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthUtility } from '../../src/utility/auth.utility';
import { INestApplication } from '@nestjs/common';

describe('AuthUtility', () => {
    let app: INestApplication;
    const authUtility: AuthUtility = new AuthUtility();
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImViYWNhODQxOGRjOGRhZmQ3YmFmZTZmZWZlZTJkZTczODcw' +
                'YjNiOWQiLCJpYXQiOjE1NDI4NDI4NzUsImV4cCI6MTU0Mjg0NjQ3NX0.NjlUBIyEvFR0XzQ3Fk5Svj25itbCCAcyfyGpMPSrn2I';

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({}).compile();
        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('getJwtFromHeaders', () => {
        const headersWithAuth = {
            'host': 'localhost:3000',
            'connection': 'keep-alive',
            'accept': 'application/json, text/*',
            'origin': 'http://localhost:8080',
            'authorization':
                'bearer ' + jwt,
            'user-agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1)' +
                'AppleWebKit/537.36 (KHTML, like Gecko)' +
                'Chrome/70.0.3538.102 Safari/537.36',
            'dnt': '1',
            'referer': 'http://localhost:8080/logs',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7'
        };

        const headersWithCookieToken = {
            'host': 'localhost:3000',
            'connection': 'keep-alive',
            'upgrade-insecure-requests': '1',
            'user-agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1)' +
                'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                'Chrome/70.0.3538.102 Safari/537.36',
            'dnt': '1',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie':
                'ga=GA1.1.1745498335.1542716010; ' +
                `token=${jwt}`
        };

        it('should return JWT from authorization headers', async () => {
            return expect(await authUtility.getJwtFromHeaders(headersWithAuth)).toBe(jwt);
        });

        it('should return JWT from cookie headers with a token', async () => {
            return expect(await authUtility.getJwtFromHeaders(headersWithCookieToken)).toBe(jwt);
        });
    });

});
