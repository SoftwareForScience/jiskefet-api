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
        @InjectRepository(Run) runRepository: Repository<Run>,
    ) {
        this.flpRepository = flpRepository;
        this.runRepository = runRepository;
    }

    /**
     * Returns one FLP based on the flpName and the runNumber.
     * @param flpName is the indentifier for a FLP.
     * @param runNumber is the unique indentifier for a Run.
     */
    async findOne(flpName: string, runNumber: number): Promise<FlpRole> {
        const run = await this.runRepository.findOne(runNumber);
        if (!run) {
            throw new HttpException(`Run with run number ${runNumber} does not exist.`, HttpStatus.NOT_FOUND);
        }

        return await this.flpRepository
            .createQueryBuilder('flp_role')
            .where('fk_run_number = :runNumber', { runNumber })
            .andWhere('flp_name = :flpName', { flpName })
            .getOne()
            .then((res: FlpRole) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
    }

    /**
     * Creates a FLP.
     * @param createFlpDto
     */
    async create(createFlpDto: CreateFlpDto): Promise<FlpRole> {
        const flpEntity = plainToClass(FlpRole, createFlpDto);
        const flp = await this.findOne(createFlpDto.flpName, createFlpDto.run);
        if (flp) {
            throw new HttpException(
                `FLP with run number ${createFlpDto.run} and ${createFlpDto.flpName} already exist.`,
                HttpStatus.CONFLICT,
            );
        }

        flpEntity.run = await this.runRepository.findOne(createFlpDto.run);
        return await this.flpRepository.save(flpEntity);
    }

    /**
     * Updates a FLP for specific Run and flpName.
     * @param flpName is the indentifier for a FLP.
     * @param runNumber is the unique indentifier for a Run.
     * @param patchFlpDto
     */
    async patch(flpName: string, runNumber: number, patchFlpDto: PatchFlpDto): Promise<FlpRole> {
        let flpToUpdate: FlpRole;
        flpToUpdate = await this.findOne(flpName, runNumber);
        const run = await this.runRepository.findOne(runNumber);

        flpToUpdate.nSubTimeframes = patchFlpDto.nSubTimeframes;
        flpToUpdate.equipmentBytes = patchFlpDto.equipmentBytes;
        flpToUpdate.recordingBytes = patchFlpDto.recordingBytes;
        flpToUpdate.fairMQBytes = patchFlpDto.fairMQBytes;
        flpToUpdate.run = run;

        return await this.flpRepository.save(flpToUpdate);
    }

    /**
     * Finds all the FLPs for a specific Run.
     * @param runNumber is the unique indentifier for a Run.
     */
    async findFLPsByRunId(runNumber: number): Promise<FlpRole[]> {
        const run = await this.runRepository.findOne(runNumber);
        if (!run) {
            throw new HttpException(`Run with run number ${runNumber} does not exist.`, HttpStatus.NOT_FOUND);
        }
        return await this.flpRepository
            .createQueryBuilder('flp_role')
            .where('fk_run_number = :runNumber', { runNumber })
            .getMany()
            .then((res: FlpRole[]) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
    }
}
