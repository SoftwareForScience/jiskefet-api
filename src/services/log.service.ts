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
import * as _ from 'lodash';
import { QueryLogDto } from '../dtos/query.log.dto';
import { OrderDirection } from '../enums/orderDirection.enum';

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
        if (LogEntity.attachments) {
            for (const attachment of LogEntity.attachments) {
                attachment.creationTime = LogEntity.creationTime;
            }
        }
        await this.repository.save(LogEntity);
        return LogEntity;
    }

    /**
     * Returns all Logs from the db.
     */
    async findAll(queryLogDto: QueryLogDto): Promise<{ logs: Log[], count: number }> {
        let query = await this.repository.createQueryBuilder()
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
                _.snakeCase(queryLogDto.orderBy),
                queryLogDto.orderDirection || OrderDirection.asc
            );
        }
        const result = await query
            .skip((+queryLogDto.pageNumber - 1 || 0) * +queryLogDto.pageSize || 0)
            .take(+queryLogDto.pageSize || 25)
            .getManyAndCount();
        return { logs: result[0], count: result[1] };
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
            .then((res: Log) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
    }
}
