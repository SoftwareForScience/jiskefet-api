/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Log } from '../entities/log.entity';
import { CreateLogDto } from '../dtos/create.log.dto';
import { Run } from '../entities/run.entity';
import { LinkRunToLogDto } from '../dtos/linkRunToLog.log.dto';
import { QueryLogDto } from '../dtos/query.log.dto';
import { OrderDirection } from '../enums/orderDirection.enum';
import { AdditionalOptions } from '../interfaces/response_object.interface';
import { SubType } from '../enums/log.subtype.enum';
import { ThreadDto } from '../dtos/thread.dto';
import { ThreadUtility } from '../utility/thread.utility';
import * as _ from 'lodash';

@Injectable()
export class LogService {
    private readonly logRepository: Repository<Log>;
    private readonly runRepository: Repository<Run>;
    private readonly threadUtility: ThreadUtility;

    constructor(
        @InjectRepository(Log) logRepository: Repository<Log>,
        @InjectRepository(Run) runRepository: Repository<Run>
    ) {
        this.logRepository = logRepository;
        this.runRepository = runRepository;
        this.threadUtility = new ThreadUtility();
    }

    /**
     * Saves a Log entity in db by converting the given CreateLogDto to a Log.
     * @param createLogDto class that carries the request body for a Log.
     */
    async create(createLogDto: CreateLogDto): Promise<Log | void> {
        const logEntity = plainToClass(Log, createLogDto);
        logEntity.creationTime = new Date();
        // check subtype
        if (logEntity.subtype === SubType.run) {
            return this.createRunLog(logEntity, createLogDto.run);
        } else if (logEntity.subtype === SubType.comment) {
            return this.createCommentLog(logEntity, createLogDto.parentId);
        } else if (logEntity.subtype) {
            throw new HttpException('This subtype of log is not implemented yet.', HttpStatus.NOT_IMPLEMENTED);
        } else {
            // there should be a better check
            throw new HttpException('Cannot create empty Log', HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Returns all Logs from the db that match the queryfilters.
     * @param queryLogDto queryfilters.
     */
    async find(queryLogDto?: QueryLogDto):
        Promise<{ logs: Log[] | ThreadDto, additionalInformation: AdditionalOptions }> {
        // check to return thread or any logs
        if (queryLogDto.threadId) {
            return await this.findThread(queryLogDto.threadId);
        } else {
            return await this.findAllLogs(queryLogDto);
        }
    }

    /**
     * Returns a Log by id from the db.
     * @param id unique identifier for a Log.
     */
    async findLogById(id: number): Promise<Log> {
        return await this.logRepository
            .createQueryBuilder('log')
            .leftJoinAndSelect('log.runs', 'runs')
            .innerJoinAndSelect('log.user', 'user')
            .where('log_id = :id', { id })
            .getOne()
            .then((res: Log) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
    }

    /**
     * Link a run to a log.
     * @param linkRunToLogDto
     */
    async linkRunToLog(logId: number, linkRunToLogDto: LinkRunToLogDto): Promise<void> {
        const log = await this.findLogById(logId);
        if (!log) {
            throw new HttpException(`Log with log number ${logId} does not exist.`, HttpStatus.NOT_FOUND);
        }
        const run = await this.runRepository.findOne(linkRunToLogDto.runNumber);
        if (!run) {
            throw new HttpException(
                `Run with run number ${linkRunToLogDto.runNumber} does not exist.`, HttpStatus.NOT_FOUND);
        }
        log.runs = [...log.runs, run];
        await this.logRepository.save(log);
    }

    /**
     * Returns logs from a specific user
     * @param userId number
     */
    async findLogsByUserId(
        userId: number,
        queryLogDto: QueryLogDto
    ): Promise<{ logs: Log[], additionalInformation: AdditionalOptions }> {
        let query = await this.logRepository
            .createQueryBuilder('log')
            .innerJoinAndSelect('log.user', 'user')
            .where('fk_user_id = :userId', { userId });

        if (queryLogDto.orderBy) {
            query = query.orderBy(
                `log.${queryLogDto.orderBy}`,
                queryLogDto.orderDirection || OrderDirection.asc
            );
        }
        const result = await query
            .skip((+queryLogDto.pageNumber - 1 || 0) * +queryLogDto.pageSize || 0)
            .take(+queryLogDto.pageSize || 16)
            .getManyAndCount();
        return {
            logs: result[0],
            additionalInformation: {
                count: result[1],
                pageNumber: queryLogDto.pageNumber,
                pageSize: queryLogDto.pageSize
            }
        };
    }

    /**
     * This function gets params for
     * LogInfo template
     * from database
     * @param Id this is ID of log
     */
    async getLogInfoParams(Id: number): Promise<any> {

        const result = await this.findLogById(Id);
        if (!result) {
            throw new HttpException(
                `Log with log id ${Id} does not exists.`, HttpStatus.NOT_FOUND
            );
        }
        const params = {
            user: result.user.userId, external: result.user.externalUserId, sams: result.user.samsId,
            logId: result.logId, subsytemID: result.subsystemFkSubsystemId, subtype: result.subtype,
            origin: result.origin, creationTime: result.creationTime,
            title: result.title, text: result.body
        };
        return params;
    }

    /**
     * Create a Log with subtype 'run'
     * @param log the log to be created
     * @param runId the run to be linked to the log
     */
    private async createRunLog(log: Log, runId?: number): Promise<Log> {
        log.runs = [];
        if (log.attachments) {
            for (const attachment of log.attachments) {
                attachment.creationTime = log.creationTime;
            }
        }

        if (runId) {
            const run = await this.runRepository.findOne(runId);
            if (!run) {
                throw new HttpException(
                    `Run with run number ${runId} does not exist.`, HttpStatus.NOT_FOUND
                );
            }
            await log.runs.push(run);
        }
        const runLog = await this.logRepository.save(log);
        // Set the parentLogId and rootLogId to itself
        runLog.commentFkParentLogId = runLog.logId;
        runLog.commentFkRootLogId = runLog.logId;
        return this.logRepository.save(log);
    }

    /**
     * Create a Log with subtype 'comment'
     * @param log the comment to be created
     * @param parentId the parent of the comment
     */
    private async createCommentLog(log: Log, parentId?: number): Promise<Log> {
        log.origin = 'human';

        if (parentId) {
            // set the parentId and rootId in order to add to thread
            const parent = await this.logRepository.findOne(parentId);
            const root = await this.logRepository.findOne(parent.commentFkRootLogId);
            log.commentFkParentLogId = parentId;
            log.commentFkRootLogId = root.logId;
            return await this.logRepository.save(log);
        } else {
            // create new thread by setting root and parent with own id
            log.commentFkParentLogId = log.logId;
            log.commentFkRootLogId = log.logId;
            return await this.logRepository.save(log);
        }
    }

    /**
     * Returns all Logs from the db that match the queryfilters.
     * @param queryLogDto queryfilters.
     */
    private async findAllLogs(queryLogDto: QueryLogDto):
        Promise<{ logs: Log[], additionalInformation: AdditionalOptions }> {
        let query = await this.logRepository.createQueryBuilder('log')
            .innerJoinAndSelect('log.user', 'user')
            .where('title like :title', {
                title: queryLogDto.searchterm ? `%${queryLogDto.searchterm}%` : '%'
            })
            .andWhere('subtype like :subtype', {
                subtype: queryLogDto.subtype ? queryLogDto.subtype : '%'
            })
            .andWhere('origin like :origin', {
                origin: queryLogDto.origin ? queryLogDto.origin : '%'
            });

        if (queryLogDto.startCreationTime) {
            await query.andWhere('creation_time >= :startCreationTime', {
                startCreationTime: queryLogDto.startCreationTime
            });
        }

        if (queryLogDto.endCreationTime) {
            await query.andWhere('creation_time <= :endCreationTime', {
                endCreationTime: queryLogDto.endCreationTime
            });
        }

        if (queryLogDto.logId) {
            await query.andWhere('log_id = :id', {
                id: queryLogDto.logId
            });
        }

        if (queryLogDto.orderBy) {
            query = query.orderBy(
                `log.${queryLogDto.orderBy}`,
                queryLogDto.orderDirection || OrderDirection.asc
            );
        }
        const result = await query
            .skip((+queryLogDto.pageNumber - 1 || 0) * +queryLogDto.pageSize || 0)
            .take(+queryLogDto.pageSize || 25)
            .getManyAndCount();
        return {
            logs: result[0],
            additionalInformation: {
                count: result[1],
                pageNumber: queryLogDto.pageNumber,
                pageSize: queryLogDto.pageSize
            }
        };
    }

    /**
     * Find a thread that contains the log with given @param logId.
     */
    private async findThread(logId: number):
        Promise<{ logs: ThreadDto, additionalInformation: AdditionalOptions }> {
        // Fetch the Log by given logId
        const log = await this.logRepository.findOne(logId);

        let root: Log;
        if (logId === log.commentFkRootLogId) {
            // The log given is the root of the thread.
            root = log;
        } else {
            // Fetch the root Log
            root = await this.logRepository.findOne(log.commentFkRootLogId);
        }

        // Fetch all comments of root Log
        const comments = await this.logRepository.find({
            where: [{
                commentFkRootLogId: root.logId,
                logId: Not(root.logId)
            }]
        });

        const amountOfComments = comments.length;

        const threadStructured = await this.threadUtility.createThreadStructure(root, comments);

        return {
            logs: threadStructured,
            additionalInformation: {
                count: amountOfComments + 1
            }
        };
    }

}
