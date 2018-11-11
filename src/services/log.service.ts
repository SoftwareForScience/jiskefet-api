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

    constructor(@InjectRepository(Log) repository: Repository<Log>) {
        this.repository = repository;
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
}
