/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { EntityRepository } from 'typeorm';
import { Run } from '../../src/entities/run.entity';
import { CreateRunDto } from '../../src/dtos/create.run.dto';
import { plainToClass } from 'class-transformer';
import { logArray, LogRepository } from './log.repository';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { LinkLogToRunDto } from '../../src/dtos/linkLogToRun.run.dto';
import { ModuleRef } from '@nestjs/core';

export const runArray: Run[] = [
    {
        runNumber: 1,
        activityId: 'Test activity',
        bytesReadOut: 12345,
        bytesTimeframeBuilder: 12345,
        detectorQualityHistories: [],
        detectorsInRun: [],
        epnRoleSessions: [],
        flpRoles: [],
        logs: [],
        nDetectors: 1,
        nEpns: 1,
        nFlps: 1,
        nSubtimeframes: 1,
        nTimeframes: 1,
        runEorHistories: [],
        runQuality: ['test'],
        runQualityHistories: [],
        runType: ['test'],
        tags: [],
        timeO2End: new Date(),
        timeO2Start: new Date(),
        timeTrgEnd: new Date(),
        timeTrgStart: new Date()
    },
    {
        runNumber: 2,
        activityId: 'Test activity',
        bytesReadOut: 23456,
        bytesTimeframeBuilder: 23456,
        detectorQualityHistories: [],
        detectorsInRun: [],
        epnRoleSessions: [],
        flpRoles: [],
        logs: [],
        nDetectors: 1,
        nEpns: 1,
        nFlps: 1,
        nSubtimeframes: 1,
        nTimeframes: 1,
        runEorHistories: [],
        runQuality: ['test'],
        runQualityHistories: [],
        runType: ['test'],
        tags: [],
        timeO2End: new Date(),
        timeO2Start: new Date(),
        timeTrgEnd: new Date(),
        timeTrgStart: new Date()
    }
];

/**
 * This class mocks the function calls from the RunService
 */
@Injectable()
@EntityRepository(Run)
export class RunRepository {
    // private logRepository: LogRepository = new LogRepository();
    private logRepository: LogRepository;

    // constructor(
    //     @Inject(forwardRef(() => LogRepository)) logRepository: LogRepository,
    // ) {
    //     this.logRepository = logRepository;
    // }

    constructor(
        private readonly moduleRef: ModuleRef
    ) {}

    onModuleInit(): void {
        this.logRepository = this.moduleRef.get<LogRepository>(LogRepository);
    }

    /**
     * Handler for saving the run entity in db.
     * @param createRunDto
     */
    async create(createRunDto: CreateRunDto): Promise<Run> {
        const RunEntity = plainToClass(Run, createRunDto);
        return RunEntity;
    }

    /**
     * Handler for getting a specific Run item from db.
     * @param id unique identifier for a Run.
     */
    async findById(id: number): Promise<Run> {
        return await runArray.find(result => result.runNumber === id);
    }

    /**
     * Returns runs from the db, filtered by the optional query.
     * @param query QueryRunDto
     */
    async findAll(): Promise<{ runs: Run[], count: number }> {
        return await {
            runs: runArray,
            count: runArray.length
        };
    }

    // /**
    //  * Link a log to a run.
    //  * @param linkLogToRunDto
    //  */
    // async linkLogToRun(runNumber: number, linkLogToRunDto: LinkLogToRunDto): Promise<Run> {
    //     const run = await this.findById(runNumber);
    //     const log = await this.logRepository.findLogById(linkLogToRunDto.logId);
    //     run.logs = [...run.logs, log];
    //     return await run;
    // }
}
