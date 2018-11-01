import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { RunModule } from '../../src/modules/run.module';
import { RunService } from '../../src/services/run.service';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Run } from '../../src/entities/run.entity';
import { expect } from 'chai';
import { CreateRunDto } from '../../src/dtos/create.run.dto';
import { plainToClass } from 'class-transformer';

const mockRepository = { };

describe('RunController', () => {
    let app: INestApplication;
    const runService = {
        findAll: () => ['test'],
        findById: () => ({ test: 'test' }),
        create: (runToCreate: CreateRunDto): Run => plainToClass(Run, runToCreate)
    };

    before(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [RunModule],
            providers: [
                {
                    provide: 'RunRepository',
                    useClass: Repository
                }
            ]
        })
            .overrideProvider(RunService)
            .useValue(runService)
            .overrideProvider(getRepositoryToken(Run))
            .useValue(mockRepository)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    after(async () => {
        await app.close();
    });

    describe('POST /runs', () => {
        const runToPost: CreateRunDto = {
            timeO2Start: new Date('2000-01-01'),
            timeTrgStart: new Date('2000-01-01'),
            timeO2End: new Date('2000-01-01'),
            timeTrgEnd: new Date('2000-01-01'),
            runType: 'fast',
            runQuality: 'good',
            activityId: 'Sl4e12ofb83no92ns',
            nDetectors: 16,
            nFlps: 7,
            nEpns: 8,
            nTimeframes: 2,
            nSubtimeframes: 4,
            bytesReadOut: 5,
            bytesTimeframeBuilder: 12
        };

        it('should return status 201', () => {
            return request(app.getHttpServer())
                .post(`/runs`)
                .send(runToPost)
                .expect(201);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .post(`/runs`)
                .send(runToPost)
                .expect('Content-Type', /json/);
        });

        it('should return an object', () => {
            return request(app.getHttpServer())
                .post(`/runs`)
                .send(runToPost)
                .set('Accept', 'application/json')
                .then(response => {
                    expect(response.body).to.be.an('object');
                    expect(response.body.activityId).to.equal('Sl4e12ofb83no92ns');
                });
        });
    });

    describe('GET /runs', () => {
        it('should return status 200', () => {
            return request(app.getHttpServer())
                .get('/runs')
                .expect(200)
                .expect(['test']);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .get('/runs')
                .expect(200)
                .expect('Content-Type', /json/);
        });

        it('should return an array', () => {
            return request(app.getHttpServer())
                .get('/runs')
                .then(response => {
                    expect(response.body).to.be.an('array');
                });
        });
    });

    describe('GET /runs/{id}', () => {
        it('should return status 200', () => {
            return request(app.getHttpServer())
                .get(`/runs/${1}`)
                .expect(200);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .get(`/runs/${1}`)
                .expect('Content-Type', /json/);
        });

        it('should return an object', () => {
            return request(app.getHttpServer())
                .get(`/runs/${1}`)
                .then(response => {
                    expect(response.body).to.be.an('object');
                });
        });
    });
});
