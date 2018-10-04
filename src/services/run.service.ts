import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Run } from 'entities/run.entity';
import { CreateRunDto } from 'dtos/create.run.dto';
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
     * Handler for getting all runs, with optional filters.
     * @param searchTerm filter for
     * @param minHours filter for
     * @param maxHours fitler
     * @param major filter
     */
    async find(searchTerm?: string, minHours?: number, maxHours?: number, major?: string): Promise<Run[]> {

        if (isNullOrUndefined(searchTerm)) {
            searchTerm = '';
        }
        if (isNullOrUndefined(minHours)) {
            minHours = 0;
        }
        if (isNullOrUndefined(maxHours)) {
            maxHours = 9999;
        }
        if (isNullOrUndefined(major)) {
            major = '';
        }

        return await this.repository.find({ where: { firstName: 'Timber', lastName: 'Saw' } });

    }

    /**
     * Handler for getting a specific Run item from db.
     * @param id unique identifier for a Run.
     */
    async findRunById(id: number): Promise<Run> {
        return await this.repository.createQueryBuilder()
            .where('runNumber = :id', { id })
            .getOne()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
}
