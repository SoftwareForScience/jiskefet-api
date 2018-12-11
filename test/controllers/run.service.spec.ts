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
import { RunRepository, runArray } from '../mocks/run.repository';
import { Run } from '../../src/entities/run.entity';
import { LinkLogToRunDto } from '../../src/dtos/linkLogToRun.run.dto';

describe('RunService', () => {
    let runService: RunService;

    const runDto: CreateRunDto = {
        activityId: 'Test activity',
        bytesReadOut: 12345,
        bytesTimeframeBuilder: 12345,
        nDetectors: 1,
        nEpns: 1,
        nFlps: 1,
        nSubtimeframes: 1,
        nTimeframes: 1,
        runQuality: 'test',
        runType: 'test',
        timeO2End: new Date(),
        timeO2Start: new Date(),
        timeTrgEnd: new Date(),
        timeTrgStart: new Date()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            components: [
                RunService,
            ],
        })
        .overrideProvider(RunService)
        .useClass(RunRepository)
        .compile();

        runService = await module.get<RunService>(RunService);
    });

    describe('post()', () => {

        it('should be defined', async () => {
            expect(runService).toBeDefined();
        });

        it('should create one run and return it', async () => {
            const result = await runService.create(runDto);
            expect(result).toBeInstanceOf(Run);
        });

        // it('should link a log to a run', async () => {
        //     const runId = runArray[0].runNumber;
        //     const logId: LinkLogToRunDto = {
        //         logId: 1,
        //     };
        //     expect(await runService.linkLogToRun(runId, logId)).toHaveBeenCalled();
        // });
    });

    describe('get()', () => {
        it('should return one run', async () => {
            const run = runArray[0];
            expect(await runService.findById(1)).toEqual(run);
        });

        it('should return an array of logs', async () => {
            const runs = runArray;
            expect(await runService.findAll(null)).toEqual({ runs, count: runs.length});
        });
    });
});
