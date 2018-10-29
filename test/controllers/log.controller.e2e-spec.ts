import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { LogModule } from '../../src/modules/log.module';
import { LogService } from '../../src/services/log.service';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Log } from '../../src/entities/log.entity';
import { expect } from 'chai';

const mockRepository = {
    findAll() {
        return ['Log1', 'Log2'];
    }
};

describe('LogController', () => {
    let app: INestApplication;
    const logService = { findAll: () => ['test'] };

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
                .expect('Content-Type', /json/);
        });

        it('should return an array', () => {
            const req = request(app.getHttpServer())
                .get('/logs');

            expect(req).to.be.an('object');
        });
    });
});
