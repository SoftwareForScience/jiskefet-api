/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Log } from '../entities/log.entity';
import { CreateLogDto } from '../dtos/create.log.dto';
import { isNullOrUndefined } from 'util';
import { Run } from '../entities/run.entity';
import { LinkRunToLogDto } from '../dtos/linkRunToLog.log.dto';

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
        const LogEntity = plainToClass(Log, createLogDto);
        LogEntity.creationTime = new Date();
        await this.repository.save(LogEntity);
        return LogEntity;
    }

    /**
     * Returns all Logs from the db.
     */
    async findAll(
        pageSize: number, pageNumber?: number,
        logId?: number, searchterm?: string,
        subType?: string, origin?: string,
        creationTime?: string
    ): Promise<Log[]> {

        const sqlQuery = this.repository.createQueryBuilder();

        if (!isNullOrUndefined(logId)) {
            return await sqlQuery
                .where('log_id = :id', { id: logId })
                .getMany()
                .then(res => Promise.resolve(res))
                .catch(err => Promise.reject(err));
        } else {
            return await sqlQuery
                .where('title like :title', {
                    title: searchterm ? `%${searchterm}%` : '%'
                })
                .andWhere('subtype like :sub', {
                    sub: subType ? subType : '%'
                })
                .andWhere('origin like :orig', {
                    orig: origin ? origin : '%'
                })
                .andWhere('creation_time >= :createTime', {
                    createTime: creationTime ? creationTime.replace('%3A', ':') : '1970-01-01 21:45:43'
                })
                .skip((pageNumber || 0) * pageSize)
                .take(pageSize)
                .getMany();
        }
    }

    /**
     * Returns a Log by id from the db.
     * @param id unique identifier for a Log.
     */
    async findLogById(id: number): Promise<Log> {
        return await this.repository
            .createQueryBuilder('log')
            .leftJoinAndSelect('log.runs', 'runs')
            .where('log_id = :id', { id })
            .getOne()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
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
}
