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
import { PatchFlpDto } from '../dtos/patch.flp.dto';

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

    async findOne(flpName: string, runNumber: number): Promise<FlpRole> {
        const run = await this.runRepository.findOne(runNumber);
        if (!run) {
            throw new HttpException(`Run with run number ${runNumber} does not exist.`, HttpStatus.NOT_FOUND);
        }

        return await this.flpRepository
            .createQueryBuilder('flp_role')
            .where('flp_hostname = :flpName', {flpName})
            .andWhere('fk_run_number = :runNumber', {runNumber})
            .getOne()
            .then((res: FlpRole) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
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

    async patch(flpName: string, runNumber: number, patchFlpDto: PatchFlpDto): Promise<FlpRole> {
        let flpToUpdate: FlpRole;
        console.log(patchFlpDto);
        flpToUpdate = await this.findOne(flpName, runNumber);
        console.log(await flpToUpdate);

        flpToUpdate.nSubTimeframes = patchFlpDto.nSubTimeframes;
        flpToUpdate.equipmentBytes = patchFlpDto.equipmentBytes;
        flpToUpdate.recordingBytes = patchFlpDto.recordingBytes;
        flpToUpdate.fairMQBytes = patchFlpDto.fairMQBytes;

        return await this.flpRepository.save(flpToUpdate);
    }
}
