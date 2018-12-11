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
import { LogRepository, logArray } from '../mocks/log.repository';
import { Log } from '../../src/entities/log.entity';
import { runArray } from '../mocks/run.repository';
// import { LogRepository } from '../mocks/log.repository';

describe('LogService', () => {
    let logService: LogService;

    const logDto: CreateLogDto = {
        title: 'title',
        text: 'text',
        subtype: 'run',
        origin: 'human',
        user: 1,
        runs: null
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            components: [
                LogService,
            ],
        })
        .overrideProvider(LogService)
        .useClass(LogRepository)
        .compile();

        logService = await module.get<LogService>(LogService);
    });

    describe('post()', () => {

        it('should be defined', async () => {
            expect(logService).toBeDefined();
        });

        it('should create one log and return it', async () => {
            const result = await logService.create(logDto);
            expect(result).toBeInstanceOf(Log);
        });

        it('should link a run to a log', async () => {
            const logId = logArray[0].logId;
            const runId: LinkRunToLogDto = {
                runNumber: 1,
            };

            const log = logArray[0];
            log.runs = [...log.runs, runArray[0]];
            expect(await logService.linkRunToLog(logId, runId)).toEqual(log);
        });
    });

    describe('get()', () => {
        it('should return one log', async () => {
            const log = logArray[0];
            expect(await logService.findLogById(1)).toEqual(log);
        });

        it('should return an array of logs', async () => {
            const logs = logArray;
            expect(await logService.findAll(null)).toEqual({ logs, count: logs.length});
        });

        it('should return the logs from the given user', async () => {
            const logsFromUser = logArray.filter(result => result.user.userId === 1);
            expect(await logService.findLogsByUserId(1, null))
                .toEqual({data: logsFromUser, count: logsFromUser.length});
        });
    });
});
