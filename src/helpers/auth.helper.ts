/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { BCryptService } from '../../src/services/bcrypt.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

// Import dotenv so end-to-end tests can find the env variables.
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Returns a JWT to be used for (end-to-end) testing.
 * JWT is obtained by calling an endpoint that verifies the JWT secret by providing the
 * JWT secret that exists in the env.
 * @param app Nest application.
 * @returns JWT string
 */
export const getJwt = async (app: INestApplication): Promise<string> => {
    const bcryptService = new BCryptService();
    const hashedSecret = await bcryptService.hashToken(process.env.JWT_SECRET_KEY);
    const response = await request(app.getHttpServer())
        .get(`/test-token?hashedSecret=${hashedSecret}`);
    const jwt = response.body;
    return jwt.token;
};
