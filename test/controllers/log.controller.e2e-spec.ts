import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { LogModule } from '../../src/modules/log.module';
import { LogService } from '../../src/services/log.service';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Log } from '../../src/entities/log.entity';
import { expect } from 'chai';
import { CreateLogDto } from '../../src/dtos/create.log.dto';
import { plainToClass } from 'class-transformer';

const mockRepository = {};

describe('LogController', () => {
    let app: INestApplication;
    const logService = {
        findAll: () => ['test'],
        findLogById: () => ({ test: 'test' }),
        create: (logToCreate: CreateLogDto): Log => plainToClass(Log, logToCreate)
    };

    before(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [LogModule],
            providers: [
                {
                    provide: 'LogRepository',
                    useClass: Repository
                }
            ]
        })
            .overrideProvider(LogService)
            .useValue(logService)
            .overrideProvider(getRepositoryToken(Log))
            .useValue(mockRepository)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    after(async () => {
        await app.close();
    });

    describe('POST /logs', () => {
        const logToPost: CreateLogDto = {
            subtype: 'run',
            origin: 'human',
            title: 'test log',
            text: 'text of test log',
            runs: [8]
        };

        it('should return status 201', () => {
            return request(app.getHttpServer())
                .post(`/logs`)
                .send(logToPost)
                .expect(201);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .post(`/logs`)
                .send(logToPost)
                .expect('Content-Type', /json/);
        });

        it('should return an object', () => {
            return request(app.getHttpServer())
                .post(`/logs`)
                .send(logToPost)
                .set('Accept', 'application/json')
                .then(response => {
                    expect(response.body).to.be.an('object');
                    expect(response.body.title).to.equal('test log');
                });
        });
    });

    describe('GET /logs', () => {
        it('should return status 200', () => {
            return request(app.getHttpServer())
                .get('/logs')
                .expect(200)
                .expect(['test']);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .get('/logs')
                .expect(200)
                .expect('Content-Type', /json/);
        });

        it('should return an array', () => {
            return request(app.getHttpServer())
                .get('/logs')
                .then(response => {
                    expect(response.body).to.be.an('array');
                });
        });
    });

    describe('GET /logs/{id}', () => {
        it('should return status 200', () => {
            return request(app.getHttpServer())
                .get(`/logs/${1}`)
                .expect(200);
        });

        it('should return JSON', () => {
            return request(app.getHttpServer())
                .get(`/logs/${1}`)
                .expect('Content-Type', /json/);
        });

        it('should return an object', () => {
            return request(app.getHttpServer())
                .get(`/logs/${1}`)
                .then(response => {
                    expect(response.body).to.be.an('object');
                });
        });
    });
});
