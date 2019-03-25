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
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('RunService', () => {
    let runService: RunService;
    let logService: LogService;

    // let runRepository: Repository<Run>;
    // let logRepository: Repository<Log>;

    const runNumber = Math.floor(+new Date() / 1000);

    const runDto: CreateRunDto = {
        runNumber,
        activityId: 'Test activity',
        nDetectors: 1,
        nEpns: 1,
        nFlps: 1,
        runType: 'TECHNICAL',
        O2StartTime: new Date(),
        TrgStartTime: new Date()
    };

    let run: Run;

    let runArray: Run[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RunService,
                LogService,
                {
                    provide: 'LogRepository',
                    useClass: Repository,
                    // useValue: Log,
                    // inject: Log,
                },
                {
                    provide: 'RunRepository',
                    useClass: Repository,
                    // useValue: Run,
                    // inject: Run
                }
            ],
            imports: [
                TypeOrmModule.forRoot(),
                TypeOrmModule.forFeature([Run, Log])
            ]
        })
        .compile();

        // runRepository = await module.get<Repository<Run>>(Repository);
        runService = await module.get<RunService>(RunService);
        // logRepository = await module.get<Repository<Log>>(Repository);
        logService = await module.get<LogService>(LogService);
    });

    describe('initialize', () => {
        it('expects logService to be defined', async () => {
            expect(logService).toBeDefined();
        });

        it('expects runService to be defined', async () => {
            expect(runService).toBeDefined();
        });

        it('should return a run with runNumber 1', async () => {
            run = await runService.findById(1);
            expect(run).toBeGreaterThanOrEqual(1);
        });

        it('should return an array of runs', async () => {
            const runResult = await runService.findAll(null);
            runArray = runResult.runs;
            expect(runArray).toBeGreaterThanOrEqual(1);
        });
    });

    describe('post()', () => {
        it('should create one run and return it', async () => {
            const result = await runService.create(runDto);
            expect(result).toBeInstanceOf(Run);
        });

        it('should link a log to a run', async () => {
            // retrieve the latest run
            const runs = await runService.findAll(null);
            const latestRun = runs.runs[runs.runs.length - 1];
            const runId = latestRun.runNumber;

            // retrieve the latest log
            const logs = await logService.findAll(null);
            const latestLog = logs.logs[logs.logs.length - 1];
            const logId: LinkLogToRunDto = {
                logId: latestLog.logId,
            };

            expect(await runService.linkLogToRun(runId, logId)).toHaveBeenCalled();
        });
    });
});
