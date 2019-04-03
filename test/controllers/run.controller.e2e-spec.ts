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
import { LinkLogToRunDto } from '../../src/dtos/linkLogToRun.run.dto';
import { PatchRunDto } from '../../src/dtos/patch.run.dto';

describe('RunController', () => {
    let app: INestApplication;
    let jwt: string;
    let runToPost: CreateRunDto;

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
        runToPost = {
            runNumber: runNumber + 1,
            O2StartTime: new Date('2000-01-01'),
            TrgStartTime: new Date('2000-01-01'),
            runType: 'TECHNICAL',
            activityId,
            nDetectors: 16,
            nFlps: 7,
            nEpns: 8
        };

        it('should return status 201 and JSON Cotent-Type', () => {
            return request(app.getHttpServer())
                .post(`/runs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(runToPost)
                .expect(201)
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
        it('should return status 200 and JSON Content-Type', () => {
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
            expect(response.body.data.items.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('GET /runs/{id}', () => {
        it('should return status 200 and JSON Content-Type', () => {
            return request(app.getHttpServer())
                .get(`/runs/${runToPost.runNumber}`)
                .set('Authorization', `Bearer ${jwt}`)
                .expect(200)
                .expect('Content-Type', /json/);
        });

        it('should return an object', async () => {
            const response = await request(app.getHttpServer())
                .get(`/runs/${runToPost.runNumber}`)
                .set('Authorization', `Bearer ${jwt}`);

            expect(typeof response.body.data).toBe('object');
            expect(response.body.data.item).toBeDefined();
        });
    });

    describe('PATCH /runs/{id}/logs', () => {
        const linkLogToRunDto: LinkLogToRunDto = {
            logId: 1
        };

        it('should return status 200 and JSON Content-Type', () => {
            return request(app.getHttpServer())
                .patch(`/runs/${runToPost.runNumber}/logs`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(linkLogToRunDto)
                .expect(200)
                .expect('Content-Type', /json/);
        });
    });

    describe('PATCH /runs/{id}', () => {
        it('should return update a run and return status 200', () => {
            const patchRunDto: PatchRunDto = {
                O2EndTime: new Date(),
                TrgEndTime: new Date(),
                bytesReadOut: 1234567890,
                bytesTimeframeBuilder: 9876543210,
                nSubtimeframes: 1234,
                nTimeframes: 123,
                runQuality: 'Unknown'
            };

            return request(app.getHttpServer())
                .patch(`/runs/${runToPost.runNumber}`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(patchRunDto)
                .expect(200);
        });
    });
});
