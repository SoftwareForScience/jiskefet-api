/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FlpRole } from '../entities/flp_role.entity';
import { CreateFlpDto } from '../dtos/create.flp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Run } from '../entities/run.entity';
import { RunRepository } from '../../test/mocks/run.repository';

@Injectable()
export class FlpSerivce {
    private readonly flpRepository: Repository<FlpRole>;
    private readonly runRepository: Repository<Run>;

    constructor(
        @InjectRepository(FlpRole) flpRepository: Repository<FlpRole>,
        @InjectRepository(Run) runRepository: Repository<Run>
    ) {
        this.flpRepository = flpRepository;
        this.runRepository = runRepository;
    }

    async create(createFlpDto: CreateFlpDto): Promise<FlpRole> {
        const flpEntity = plainToClass(FlpRole, createFlpDto);
        const run = await this.runRepository.findOne(createFlpDto.run);
        if (!run) {
            throw new HttpException(`Run with run number ${createFlpDto.run} does not exist.`, HttpStatus.NOT_FOUND);
        }
        flpEntity.run = run;
        return await this.flpRepository.save(flpEntity);
    }
}
