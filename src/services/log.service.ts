/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Log } from '../entities/log.entity';
import { CreateLogDto } from '../dtos/create.log.dto';
import { Run } from '../entities/run.entity';
import { LinkRunToLogDto } from '../dtos/linkRunToLog.log.dto';
import { QueryLogDto } from '../dtos/query.log.dto';
import { OrderDirection } from '../enums/orderDirection.enum';
import * as _ from 'lodash';
import { AdditionalOptions } from '../interfaces/response_object.interface';

@Injectable()
export class LogService {
    private readonly repository: Repository<Log>;
    private readonly runRepository: Repository<Run>;

    constructor(
        @InjectRepository(Log) repository: Repository<Log>,
        @InjectRepository(Run) runRepository: Repository<Run>
    ) {
        this.repository = repository;
        this.runRepository = runRepository;
    }

    /**
     * Saves a Log entity in db by converting the given CreateLogDto to a Log.
     * @param createLogDto class that carries the request body for a Log.
     */
    async create(createLogDto: CreateLogDto): Promise<Log> {
        const logEntity = plainToClass(Log, createLogDto);
        logEntity.creationTime = new Date();
        logEntity.runs = [];
        if (logEntity.attachments) {
            for (const attachment of logEntity.attachments) {
                attachment.creationTime = logEntity.creationTime;
            }
        }
        if (createLogDto.runs) {
            for (const runNumber of createLogDto.runs) {
                const run = await this.runRepository.findOne(runNumber);
                if (!run) {
                    throw new HttpException(`Run with run number ${runNumber} does not exist.`, 404);
                }
                await logEntity.runs.push(run);
            }
        }
        return await this.repository.save(logEntity);
    }

    /**
     * Returns all Logs from the db.
     */
    async findAll(queryLogDto: QueryLogDto): Promise<{ logs: Log[], additionalInformation: AdditionalOptions }> {
        let query = await this.repository.createQueryBuilder('log')
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
     * Returns a Log by id from the db.
     * @param id unique identifier for a Log.
     */
    async findLogById(id: number): Promise<Log> {
        return await this.repository
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
        const run = await this.runRepository.findOne(linkRunToLogDto.runNumber);
        log.runs = [...log.runs, run];
        await this.repository.save(log);
    }

    /**
     * Returns logs from a specific user
     * @param userId number
     */
    async findLogsByUserId(
        userId: number,
        queryLogDto: QueryLogDto
    ): Promise<{ logs: Log[], additionalInformation: AdditionalOptions }> {
        let query = await this.repository
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
}
