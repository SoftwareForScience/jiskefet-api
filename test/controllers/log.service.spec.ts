/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { LogService } from '../../src/services/log.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateLogDto } from '../../src/dtos/create.log.dto';
import { LinkRunToLogDto } from '../../src/dtos/linkRunToLog.log.dto';
import { Log } from '../../src/entities/log.entity';
import { RunService } from '../../src/services/run.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Run } from '../../src/entities/run.entity';
import {
    TEST_DB_CONNECTION,
    TEST_DB_HOST,
    TEST_DB_PORT,
    TEST_DB_USERNAME,
    TEST_DB_PASSWORD,
    TEST_DB_DATABASE,
    TEST_DB_SYNCHRONIZE,
} from '../../src/constants';

describe('LogService', () => {
    let logService: LogService;
    let runService: RunService;

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
        migrationsRun: true
    };

    const logDto: CreateLogDto = {
        title: 'title',
        body: 'text',
        subtype: 'run',
        origin: 'human',
        user: 1,
        runs: null
    };

    let log: Log;

    let logArray: Log[];

    beforeAll(async () => {
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
        it('logService should be defined', async () => {
            expect(logService).toBeDefined();
        });

        it('runService should be defined', async () => {
            expect(runService).toBeDefined();
        });
    });

    describe('post()', () => {

        it('should create one log and return it', async () => {
            const result = await logService.create(logDto);
            expect(result).toBeInstanceOf(Log);
        });

        it('should link a run to a log', async () => {
            // retrieve the latest run
            const runs = await runService.findAll(null);
            const latestRun = runs.runs[runs.runs.length - 1];

            // retrieve the latest log
            const logs = await logService.findAll(null);
            const latestLog = logs.logs[logs.logs.length - 1];
            const logId = latestLog.logId;

            const runId: LinkRunToLogDto = {
                runNumber: latestRun.runNumber,
            };

            // mock linked run to log
            log.runs = [...log.runs, latestRun];
            expect(await logService.linkRunToLog(logId, runId)).toEqual(log);
        });
    });

    describe('get()', () => {
        it('should return a log with logId 1', async () => {
            log = await logService.findLogById(1);
            expect(log.logId).toBe(1);
        });

        it('should return an array of logs', async () => {
            const logs = await logService.findAll(null);
            logArray = logs.logs;
            expect(Array.isArray(logArray)).toBeTruthy();
        });

        it('should return the logs from the given user', async () => {
            const logsFromUser = logArray.filter(result => result.user.userId === 1);
            expect(await logService.findLogsByUserId(1, null))
                .toEqual({data: logsFromUser, count: logsFromUser.length});
        });
    });
});
