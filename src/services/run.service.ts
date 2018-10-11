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
import { Run } from 'entities/run.entity';
import { CreateRunDto } from 'dtos/create.run.dto';

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
     * Handler for getting all runs from db.
     */
    async findAllRuns(): Promise<Run[]> {
        return await this.repository.find();
    }

    /**
     * Handler for getting a specific Run item from db.
     * @param id unique identifier for a Run.
     */
    async findRunById(id: number): Promise<Run> {
        return await this.repository.createQueryBuilder()
            .where('run_number = :id', { id })
            .getOne()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
}
