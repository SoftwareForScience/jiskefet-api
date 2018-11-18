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
import { Run } from '../entities/run.entity';
import { CreateRunDto } from '../dtos/create.run.dto';
import { QueryRunDto } from '../dtos/query.run.dto';
import { OrderDirection } from '../enums/orderDirection.enum';
import * as _ from 'lodash';

@Injectable()
export class RunService {

    private readonly repository: Repository<Run>;

    constructor(@InjectRepository(Run) repository: Repository<Run>) {
        this.repository = repository;
    }

    /**
     * Handler for saving the run entity in db.
     * @param createRunDto
     */
    async create(createRunDto: CreateRunDto): Promise<Run> {
        const RunEntity = plainToClass(Run, createRunDto);
        await this.repository.save(RunEntity);
        return RunEntity;
    }

    /**
     * Returns runs from the db, filtered by the optional query.
     * @param query QueryRunDto
     */
    async findAll(queryRunDto?: QueryRunDto): Promise<{ runs: Run[], count: number }> {
        let query = await this.repository.createQueryBuilder()
            .where('run_type like :runType', {
                runType: queryRunDto.runType ? `%${queryRunDto.runType}%` : '%'
            })
            .andWhere('run_quality like :runQuality', {
                runQuality: queryRunDto.runQuality ? queryRunDto.runQuality : '%'
            });

        // o2 start
        if (queryRunDto.startTimeO2Start) {
            await query.andWhere('time_o2_start >= :startTimeO2Start', {
                startTimeO2Start: queryRunDto.startTimeO2Start
            });
        }

        if (queryRunDto.endTimeO2Start) {
            await query.andWhere('time_o2_start <= :endTimeO2Start', {
                endTimeO2Start: queryRunDto.endTimeO2Start
            });
        }

        // trg start
        if (queryRunDto.startTimeTrgStart) {
            await query.andWhere('time_trg_start >= :startTimeTrgStart', {
                startTimeTrgStart: queryRunDto.startTimeTrgStart
            });
        }

        if (queryRunDto.endTimeTrgStart) {
            await query.andWhere('time_o2_start <= :endTimeTrgStart', {
                endTimeTrgStart: queryRunDto.endTimeTrgStart
            });
        }

        // trg end
        if (queryRunDto.startTimeTrgEnd) {
            await query.andWhere('time_trg_end >= :startTimeTrgEnd', {
                startTimeTrgEnd: queryRunDto.startTimeTrgEnd
            });
        }

        if (queryRunDto.endTimeTrgEnd) {
            await query.andWhere('time_trg_end <= :endTimeTrgEnd', {
                endTimeTrgEnd: queryRunDto.endTimeTrgEnd
            });
        }

        // o2 end
        if (queryRunDto.startTimeO2End) {
            await query.andWhere('time_o2_end >= :startTimeO2End', {
                startTimeO2End: queryRunDto.startTimeO2End
            });
        }

        if (queryRunDto.endTimeO2End) {
            await query.andWhere('time_o2_end <= :endTimeO2End', {
                endTimeO2End: queryRunDto.endTimeO2End
            });
        }

        if (queryRunDto.runNumber) {
            await query.andWhere('run_number = :runNumber', { runNumber: queryRunDto.runNumber });
        }

        if (queryRunDto.activityId) {
            await query.andWhere('activity_id = :activityId', { activityId: queryRunDto.activityId });
        }

        if (queryRunDto.orderBy) {
            query = query.orderBy(
                _.snakeCase(queryRunDto.orderBy).replace('o_2', 'o2'),
                queryRunDto.orderDirection || OrderDirection.asc
            );
        }

        const result = await query
            .skip((+queryRunDto.pageNumber - 1 || 0) * +queryRunDto.pageSize)
            .take(+queryRunDto.pageSize)
            .getManyAndCount();

        return { runs: result[0], count: result[1] };
    }

    /**
     * Handler for getting a specific Run item from db.
     * @param id unique identifier for a Run.
     */
    async findById(id: number): Promise<Run> {
        return await this.repository
            .createQueryBuilder('run')
            .leftJoinAndSelect('run.logs', 'logs')
            .where('run_number = :id', { id })
            .getOne()
            .then((res: Run) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
    }
}
