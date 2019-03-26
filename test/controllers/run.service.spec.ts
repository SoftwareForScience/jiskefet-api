import { AppModule } from '../../src/app.module';
/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Test, TestingModule } from '@nestjs/testing';
import { RunService } from '../../src/services/run.service';
import { CreateRunDto } from '../../src/dtos/create.run.dto';
import { Run } from '../../src/entities/run.entity';
import { LinkLogToRunDto } from '../../src/dtos/linkLogToRun.run.dto';
import { LogService } from '../../src/services/log.service';
import { Log } from '../../src/entities/log.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
    TEST_DB_CONNECTION,
    TEST_DB_HOST,
    TEST_DB_PORT,
    TEST_DB_USERNAME,
    TEST_DB_PASSWORD,
    TEST_DB_DATABASE,
    TEST_DB_SYNCHRONIZE,
} from '../../src/constants';
import { RunType } from '../../src/enums/run.runtype.enum';
import { QueryRunDto } from '../../src/dtos/query.run.dto';
import { QueryLogDto } from '../../src/dtos/query.log.dto';

describe('RunService', () => {
    let runService: RunService;
    let logService: LogService;
    let run: Run;

    const databaseOptions: TypeOrmModuleOptions = {
        type: TEST_DB_CONNECTION as any,
        host: TEST_DB_HOST,
        port: +TEST_DB_PORT,
        username: TEST_DB_USERNAME,
        password: TEST_DB_PASSWORD,
        database: TEST_DB_DATABASE,
        entities: ['src/**/**.entity{.ts,.js}'],
        synchronize: TEST_DB_SYNCHRONIZE === 'true' ? true : false,
        migrations: ['populate/*{.ts,.js}'],
        migrationsRun: true,
        // logging: 'all'
    };
    const runNumber = Math.floor(+new Date() / 1000);
    const queryRunDto: QueryRunDto = {
        pageNumber: '1',
        pageSize: '25'
    };
    const queryLogDto: QueryLogDto = {};
    const runDto: CreateRunDto = {
        runNumber,
        activityId: 'Test activity',
        nDetectors: 1,
        nEpns: 1,
        nFlps: 1,
        runType: RunType.TECHNICAL,
        O2StartTime: new Date(),
        TrgStartTime: new Date()
    };

    beforeAll(async () => {
        // maybe add a switch to support an in memory db like sqljs
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RunService,
                LogService
            ],
            imports: [
                TypeOrmModule.forRoot(databaseOptions),
                TypeOrmModule.forFeature([Run, Log])
            ]
        })
            .compile();

        runService = await module.get<RunService>(RunService);
        logService = await module.get<LogService>(LogService);
    });

    describe('initialize', () => {
        it('expects logService to be defined', async () => {
            expect(logService).toBeDefined();
        });

        it('expects runService to be defined', async () => {
            expect(runService).toBeDefined();
        });
    });

    describe('post()', () => {
        it('should create one run and return it', async () => {
            const result = await runService.create(runDto);
            expect(result).toBeInstanceOf(Run);
        });

        it('should link a log to a run', async () => {
            const runs = await runService.findAll(queryRunDto);
            const latestRun = runs.runs[runs.runs.length - 1];
            const runId = latestRun.runNumber;

            // retrieve the latest log
            const logs = await logService.findAll(queryLogDto);
            const latestLog = logs.logs[logs.logs.length - 1];
            const logId: LinkLogToRunDto = {
                logId: latestLog.logId,
            };

            latestRun.logs = [latestLog];
            expect(await runService.linkLogToRun(runId, logId)).toEqual(run);
        });
    });

    describe('get()', () => {
        it('should return a run with runNumber 1', async () => {
            run = await runService.findById(1);
            expect(run.runNumber).toBe(1);
        });

        it('should return multiple runs', async () => {
            const runResult = await runService.findAll(queryRunDto);
            expect(runResult.runs.length).toBeGreaterThanOrEqual(1);
        });
    });
});
