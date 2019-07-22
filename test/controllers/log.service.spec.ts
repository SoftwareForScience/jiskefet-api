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
import { QueryRunDto } from '../../src/dtos/query.run.dto';
import { QueryLogDto } from '../../src/dtos/query.log.dto';
import { FlpRole } from '../../src/entities/flp_role.entity';
import { FlpSerivce } from '../../src/services/flp.service';

describe('LogService', () => {
    let logService: LogService;
    let runService: RunService;
    let flpService: FlpSerivce;
    let log: Log;
    let testingModule: TestingModule;

    // define databaseOptions since this test does not provide the AppModule
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
    const queryRunDto: QueryRunDto = {
        pageNumber: 1,
        pageSize: 25
    };
    const queryLogDto: QueryLogDto = {};
    const logDto: CreateLogDto = {
        title: 'title',
        body: 'text',
        subtype: 'run',
        origin: 'human',
        user: 1,
        run: null
    };

    beforeAll(async () => {
        // maybe add a switch to support an in memory db like sqljs,
        // so that tests can be run in a CI pipeline like Travis
        testingModule = await Test.createTestingModule({
            providers: [
                RunService,
                LogService,
                FlpSerivce
            ],
            imports: [
                TypeOrmModule.forRoot(databaseOptions),
                TypeOrmModule.forFeature([Run, Log, FlpRole])
            ]
        })
            .compile();

        runService = await testingModule.get<RunService>(RunService);
        logService = await testingModule.get<LogService>(LogService);
        flpService = await testingModule.get<FlpSerivce>(FlpSerivce);
    });

    afterAll(async () => {
        testingModule.close();
    });

    describe('initialize', () => {
        it('logService should be defined', async () => {
            expect(logService).toBeDefined();
        });

        it('runService should be defined', async () => {
            expect(runService).toBeDefined();
        });
    });

    describe('getLogInfoParams', ()=> {
        it('should return params with logId 1', async () => {
            const result = await logService.getLogInfoParams(1);
            expect(result.logId).toBe(1);
        });
    });

    describe('post()', () => {

        it('should create one log and return it', async () => {
            const result = await logService.create(logDto);
            expect(result).toBeInstanceOf(Log);
        });

        it('should link a run to a log', async () => {
            // retrieve the latest run
            const runs = await runService.findAll(queryRunDto);
            const latestRun = runs.runs[runs.runs.length - 1];

            // retrieve the latest log
            const logs = await logService.find(queryLogDto);
            const latestLog = logs.logs[(logs.logs as Log[]).length - 1];
            const logId = latestLog.logId;

            const runId: LinkRunToLogDto = {
                runNumber: latestRun.runNumber,
            };

            // mock linked run to log
            latestLog.runs = [latestRun];
            expect(await logService.linkRunToLog(logId, runId)).toEqual(log);
        });
    });

    describe('get()', () => {
        it('should return a log with logId 1', async () => {
            log = await logService.findLogById(1);
            expect(log.logId).toBe(1);
        });

        it('should return multiple logs', async () => {
            const logs = await logService.find(queryLogDto);
            expect((logs.logs as Log[]).length).toBeGreaterThanOrEqual(1);
        });

        it('should return the logs from the given user', async () => {
            const logsFromUser = await logService.findLogsByUserId(1, queryLogDto);
            expect(typeof logsFromUser.logs).toBe('object');
            expect(logsFromUser.logs[0].user.userId).toBe(1);
            expect(logsFromUser.logs.length).toBeGreaterThanOrEqual(1);
            expect(logsFromUser.additionalInformation).toBeDefined();
        });
    });
});
