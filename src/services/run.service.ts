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
import { isNullOrUndefined } from 'util';

@Injectable()
export class RunService {

    private readonly repository: Repository<Run>;

    constructor(@InjectRepository(Run)
    repository: Repository<Run>) {
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
     * Handler for getting Runs from db.
     * @param pageSize the amount of Runs to return.
     * @param pageNumber this number times the pageSize is the amount of Runs to skip.
     * @param runNumber for filtering on specific run_number.
     * @param time02Start for filtering on when the 02-system has started the run.
     * @param time02End for filtering on when the 02-system has ended the run.
     * @param timeTrgStart for filtering on when the TRG-system has started the run.
     * @param timeTrgEnd for filtering on when the TRG-system has ended the run.
     */
    async findAll(
        pageSize: number, pageNumber?: number,
        runNumber?: number, time02Start?: string,
        time02End?: string, timeTrgStart?: string, timeTrgEnd?: string
    ): Promise<Run[]> {

        const sqlQuery = this.repository.createQueryBuilder();

        if (!isNullOrUndefined(runNumber)) {
            return await sqlQuery
                .where('run_number = :id', { id: runNumber })
                .getMany()
                .then(res => Promise.resolve(res))
                .catch(err => Promise.reject(err));
        } else {
            return await sqlQuery
                .where('time_o2_start >= :startO2', {
                    startO2: time02Start ? time02Start.replace('%3A', ':') : '1970-01-01'
                })
                .andWhere('time_o2_end <= :endO2', {
                    endO2: time02End ? time02End.replace('%3A', ':') : '2999-01-01'
                })
                .andWhere('time_trg_start >= :startTrg', {
                    startTrg: timeTrgStart ? timeTrgStart.replace('%3A', ':') : '1970-01-01'
                })
                .andWhere('time_trg_end <= :endTrg', {
                    endTrg: timeTrgEnd ? timeTrgEnd.replace('%3A', ':') : '2999-01-01'
                })
                .skip((pageNumber || 0) * pageSize)
                .take(pageSize)
                .getMany();
        }
    }

    /**
     * Handler for getting a specific Run item from db.
     * @param id unique identifier for a Run.
     */
    async findById(id: number): Promise<Run> {
        return await this.repository.createQueryBuilder()
            .where('run_number = :id', { id })
            .getOne()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
}
