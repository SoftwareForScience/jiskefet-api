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
import { CreateRunDto } from '../../src/dtos/create.run.dto';
import { AppModule } from '../../src/app.module';
import { getJwt } from '../../src/helpers/auth.helper';

describe('RunController', () => {
    let app: INestApplication;
    let jwt: string;

    const runNumber = Math.floor(+new Date() / 1000);
    const activityId: string = 'run.controller.e2e-spec.ts';

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

    describe('POST /runs', () => {
        const runToPost: CreateRunDto = {
            runNumber: runNumber + 1,
            O2StartTime: new Date('2000-01-01'),
            TrgStartTime: new Date('2000-01-01'),
            runType: 'TECHNICAL',
            activityId,
            nDetectors: 16,
            nFlps: 7,
            nEpns: 8
        };

        it('should return status 201', () => {
            return request(app.getHttpServer())
                .post(`/runs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(runToPost)
                .expect(201);
        });

        it('should return JSON', () => {
            runToPost.runNumber = runToPost.runNumber + 2;
            return request(app.getHttpServer())
                .post(`/runs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(runToPost)
                .expect('Content-Type', /json/);
        });

        it(`should return an object containing ${activityId} as the activityId`, async () => {
            runToPost.runNumber = runToPost.runNumber + 3;
            const response = await request(app.getHttpServer())
                .post(`/runs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(runToPost)
                .set('Accept', 'application/json');
            expect(response.body.data.item.activityId).toEqual(activityId);
        });
    });

    describe('GET /runs', () => {
        it('should return status 200', () => {
            return request(app.getHttpServer())
                .get('/runs')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .get('/runs')
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200)
                .expect('Content-Type', /json/);
        });

        it('should return an object with a runs array', async () => {
            const response = await request(app.getHttpServer())
                .get('/runs')
                .set('Authorization', `Bearer ${jwt}`);
            expect(Array.isArray(response.body.data.items)).toBeTruthy();
        });
    });

    describe('GET /runs/{id}', () => {
        it('should return status 200', () => {
            return request(app.getHttpServer())
                .get(`/runs/${runNumber}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .get(`/runs/${runNumber}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect('Content-Type', /json/);
        });

        it('should return an object', async () => {
            const response = await request(app.getHttpServer())
                .get(`/runs/${runNumber}`)
                .set('Authorization', `Bearer ${jwt}`);
            expect(typeof response.body.data).toBe('object');
        });
    });
});
