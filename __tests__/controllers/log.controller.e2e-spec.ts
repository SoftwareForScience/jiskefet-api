/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { CreateLogDto } from '../../src/dtos/create.log.dto';
import { AppModule } from '../../src/app.module';
import { getJwt } from '../../src/helpers/auth.helper';

describe('LogController', () => {
    let app: INestApplication;
    let jwt: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = await moduleFixture.createNestApplication();
        await app.init();

        jwt = await getJwt(app);
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /logs', () => {
        const logToPost: CreateLogDto = {
            subtype: 'run',
            origin: 'human',
            title: 'test log',
            text: 'text of test log',
            runs: [8],
            user: 1
        };

        it('should return status 201', () => {
            return request(app.getHttpServer())
                .post(`/logs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(logToPost)
                .expect(201);
            });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .post(`/logs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(logToPost)
                .expect('Content-Type', /json/);
        });

        it('should return an object containing "test log" as a title', async () => {
            const response = await request(app.getHttpServer())
                .post(`/logs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(logToPost)
                .set('Accept', 'application/json');
            expect(response.body.title).toEqual('test log');
        });
    });

    describe('GET /logs', () => {
        it('should return status 200', () => {
            return request(app.getHttpServer())
                .get('/logs')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .get('/logs')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200)
                .expect('Content-Type', /json/);
        });
    });

    describe('GET /logs/{id}', () => {
        it('should return status 200', () => {
            return request(app.getHttpServer())
                .get(`/logs/${1}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .get(`/logs/${1}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect('Content-Type', /json/);
        });
    });
});
