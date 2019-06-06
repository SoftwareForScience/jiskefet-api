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
import { LinkRunToLogDto } from '../../src/dtos/linkRunToLog.log.dto';

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
        let logToPost: CreateLogDto = {
            subtype: 'run',
            origin: 'human',
            title: 'test log',
            body: 'text of test log',
            run: 1,
            user: 1
        };

        it('should return status 201 and JSON Content-Type', () => {
            return request(app.getHttpServer())
                .post(`/logs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(logToPost)
                .expect(201)
                .expect('Content-Type', /json/);
        });

        it('should return an object containing "test log" as a title', async () => {
            const response = await request(app.getHttpServer())
                .post(`/logs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(logToPost)
                .set('Accept', 'application/json');
            expect(response.body.data.item.title).toEqual('test log');
        });

        it('should return status 404 and JSON Content-Type', () => {
            // non existing run
            logToPost.run = -1;
            return request(app.getHttpServer())
                .post(`/logs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(logToPost)
                .expect(404)
                .expect('Content-Type', /json/);
        });

        it('should return status 400 and JSON Content-Type', () => {
            logToPost = null;
            return request(app.getHttpServer())
                .post(`/logs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(logToPost)
                .expect(400)
                .expect('Content-Type', /json/);
        });
    });

    describe('GET /logs', () => {
        it('should return status 200 and JSON Content-Type', () => {
            return request(app.getHttpServer())
                .get('/logs')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200)
                .expect('Content-Type', /json/);
        });

        it('should return an object with a logs array', async () => {
            const response = await request(app.getHttpServer())
                .get('/logs')
                .set('Authorization', `Bearer ${jwt}`);
            expect(Array.isArray(response.body.data.items)).toBeTruthy();
            expect(response.body.data.items.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('GET /logs/{id}', () => {
        it('should return status 200 and JSON Content-Type', () => {
            return request(app.getHttpServer())
                .get(`/logs/${1}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200)
                .expect('Content-Type', /json/);
        });

        it('should return an object', async () => {
            const response = await request(app.getHttpServer())
                .get(`/logs/${1}`)
                .set('Authorization', `Bearer ${jwt}`);
            expect(typeof response.body).toBe('object');
            expect(response.body.data.item).toBeDefined();
        });
    });

    describe('PATCH /logs/{id}/runs', () => {
        const linkRunToLogDto: LinkRunToLogDto = {
            runNumber: 1
        };

        it('should link a run to a log', () => {
            return request(app.getHttpServer())
                .patch(`/logs/${1}/runs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(linkRunToLogDto)
                .expect(200)
                .expect('Content-Type', /json/);
        });

        it('should return status 404 with message "Log with log number x does not exist"', () => {
            return request(app.getHttpServer())
                .patch(`/logs/${-1}/runs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(linkRunToLogDto)
                .expect(404)
                .expect('Content-Type', /json/);
        });

        it('should return status 404 with message "Run with run number x does not exist"', () => {
            linkRunToLogDto.runNumber = -1;
            return request(app.getHttpServer())
                .patch(`/logs/${1}/runs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(linkRunToLogDto)
                .expect(404)
                .expect('Content-Type', /json/);
        });
    });
});
