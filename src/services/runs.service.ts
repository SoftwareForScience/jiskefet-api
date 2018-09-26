import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Run } from 'entities/run.entity';
import { RunDto } from 'dtos/RunDto.dto';

@Injectable()
export class RunService {

    private readonly repository: Repository<Run>;

    constructor(@InjectRepository(Run)
    repository: Repository<Run>) {
        this.repository = repository;
    }

    async create(runDto: RunDto): Promise<Run> {
        const RunEntity = plainToClass(Run, runDto);
        await this.repository.save(RunEntity);
        return RunEntity;
    }

    async findAllRuns(): Promise<Run[]> {
        return await this.repository.find();
    }
}