/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { EntityRepository } from 'typeorm';
import { Log } from '../../src/entities/log.entity';
import { userArray } from './user.repository';
import { CreateLogDto } from '../../src/dtos/create.log.dto';
import { plainToClass } from 'class-transformer';
import { LinkRunToLogDto } from '../../src/dtos/linkRunToLog.log.dto';
import { RunRepository } from './run.repository';
import { OnModuleInit, Injectable, forwardRef, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
// import { ModuleRef } from '@nestjs/core';

export const logArray: Log[] = [
    {
        logId: 1,
        subtype: 'run',
        origin: 'human',
        creationTime: new Date('2018-12-29T23:59:59Z'),
        title: 'mock title 1',
        text: 'mock text 1',
        subsystemFkSubsystemId: 1,
        announcementValidUntil: new Date('2018-12-31T23:59:59Z'),
        attachments: [],
        commentFkParentLogId: null,
        commentFkRootLogId: null,
        runs: [],
        tags: [],
        user: userArray[0]
    },
    {
        logId: 2,
        subtype: 'run',
        origin: 'human',
        creationTime: new Date('2018-12-30T23:59:59Z'),
        title: 'mock title 2',
        text: 'mock text 2',
        subsystemFkSubsystemId: 2,
        announcementValidUntil: new Date('2018-12-31T23:59:59Z'),
        attachments: [],
        commentFkParentLogId: null,
        commentFkRootLogId: null,
        runs: [],
        tags: [],
        user: userArray[0]
    }
];

/**
 * This class mocks the function calls from the LogService
 */
@Injectable()
@EntityRepository(Log)
export class LogRepository {
    // private runRepository: RunRepository = new RunRepository();
    private runRepository: RunRepository;

    // constructor(
    //     @Inject(forwardRef(() => RunRepository)) runRepository: RunRepository,
    // ) {
    //     this.runRepository = runRepository;
    // }

    constructor(
        private readonly moduleRef: ModuleRef,
        @Inject(forwardRef(() => RunRepository)) runRepository: RunRepository,
    ) {
        this.runRepository = runRepository;
    }

    onModuleInit(): void {
        this.runRepository = this.moduleRef.get<RunRepository>(RunRepository, { strict: false});
    }

    /**
     * Saves a Log entity in db by converting the given CreateLogDto to a Log.
     * @param createLogDto class that carries the request body for a Log.
     */
    async create(createLogDto: CreateLogDto): Promise<Log> {
        const LogEntity = plainToClass(Log, createLogDto);
        LogEntity.creationTime = new Date();
        if (LogEntity.attachments) {
            for (const attachment of LogEntity.attachments) {
                attachment.creationTime = LogEntity.creationTime;
            }
        }
        return LogEntity;
    }

    /**
     * Returns a Log by id from the db.
     * @param runId unique identifier for a Log.
     */
    async findLogById(runId: number): Promise<Log> {
        return await logArray.find(result => result.logId === runId);
    }

    /**
     * Returns all Logs from the db.
     */
    async findAll(): Promise<{ logs: Log[], count: number }> {
        return await {
            logs: logArray,
            count: logArray.length
        };
    }

    /**
     * Returns logs from a specific user
     * @param userId number
     */
    async findLogsByUserId(userId: number): Promise<{ data: Log[], count: number }> {
        const logs = logArray.filter(result => result.user.userId === userId);
        return await {
            data: logs,
            count: logs.length
        };
    }

    /**
     * Implementation differs from the LogService, it returns a log with the linked run
     * Link a run to a log.
     * @param linkRunToLogDto
     */
    async linkRunToLog(logId: number, linkRunToLogDto: LinkRunToLogDto): Promise<Log> {
        const log = await this.findLogById(logId);

        // mocked equivalent of findOne()
        const run = await this.runRepository.findById(linkRunToLogDto.runNumber);
        log.runs = [...log.runs, run];
        return await log;
    }
}
