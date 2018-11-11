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

@Injectable()
export class LogService {

    private readonly repository: Repository<Log>;

    constructor(@InjectRepository(Log)
    repository: Repository<Log>) {
        this.repository = repository;
    }

    /**
     * Handler for saving a Log entity in db.
     * @param createLogDto class that carries the request data for a Log.
     */
    async create(createLogDto: CreateLogDto): Promise<Log> {
        const LogEntity = plainToClass(Log, createLogDto);
        await this.repository.save(LogEntity);
        return LogEntity;
    }

    /**
     * Handler for getting all Logs from db.
     */
    async findAll(
        pageSize: number,
        pageNumber?: number,
        logId?: number,
        searchterm?: string,
        subType?: string,
        origin?: string,
        creationTime?: string,
        orderBy?: string,
        orderDirection?: 'ASC' | 'DESC'

    ): Promise<{ logs: Log[], count: number }> {
        const where = await this.repository.createQueryBuilder()
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
            });
        if (logId) {
            await where.andWhere('log_id = :id', {
                id: logId
            });
        }
        const result = await where
            .orderBy(orderBy, orderDirection)
            .skip((pageNumber - 1 || 0) * pageSize)
            .take(pageSize)
            .getManyAndCount();
        return {logs: result[0], count: result[1]};
    }

    /**
     * Handler for getting a specific Log item from db.
     * @param id unique identifier for a Log.
     */
    async findLogById(id: number): Promise<Log> {
        return await this.repository.createQueryBuilder()
            .where('log_id = :id', { id })
            .getOne()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }

    /**
     * Handler for getting a specific Log item with belonging Runs from db.
     * @param id unique identifier for a Log.
     */
    async findLogWithRuns(id: number): Promise<Log> {
        return await this.repository.createQueryBuilder()
            .leftJoinAndSelect('log.runs', 'run')
            .where('log_id = :id', { id })
            .getOne()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
}
