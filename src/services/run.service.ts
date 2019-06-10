/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Run } from '../entities/run.entity';
import { CreateRunDto } from '../dtos/create.run.dto';
import { LinkLogToRunDto } from '../dtos/linkLogToRun.run.dto';
import { Log } from '../entities/log.entity';
import { QueryRunDto } from '../dtos/query.run.dto';
import { OrderDirection } from '../enums/orderDirection.enum';
import * as _ from 'lodash';
import { AdditionalOptions } from '../interfaces/response_object.interface';
import { PatchRunDto } from '../dtos/patch.run.dto';
import { RunQuality } from '../enums/run.runquality.enum';
import { FlpRole } from '../entities/flp_role.entity';

@Injectable()
export class RunService {

    private readonly runRepository: Repository<Run>;
    private readonly logRepository: Repository<Log>;
    private readonly flpRepository: Repository<FlpRole>;

    constructor(
        @InjectRepository(Run) runRepository: Repository<Run>,
        @InjectRepository(Log) logRepostiory: Repository<Log>,
        @InjectRepository(FlpRole) flpRepository: Repository<FlpRole>
    ) {
        this.runRepository = runRepository;
        this.logRepository = logRepostiory;
        this.flpRepository = flpRepository;
    }

    /**
     * Handler for saving the run entity in db.
     * @param createRunDto
     */
    async create(createRunDto: CreateRunDto): Promise<Run> {
        const RunEntity = plainToClass(Run, createRunDto);
        const run = await this.findById(RunEntity.runNumber);
        if (run) {
            throw new HttpException(
                `The request could not be completed due to a conflict with the run number: ${RunEntity.runNumber}`,
                HttpStatus.CONFLICT);
        }
        return await this.runRepository.save(RunEntity);
    }

    /**
     * Returns runs from the db, filtered by the optional query.
     * @param query QueryRunDto
     */
    async findAll(queryRunDto?: QueryRunDto): Promise<{ runs: Run[], additionalInformation: AdditionalOptions }> {
        let query = await this.runRepository.createQueryBuilder();

        if (queryRunDto.runType) {
            await query.andWhere('run_type like :runType', {
                runType: queryRunDto.runType ? queryRunDto.runType : '%'
            });
        }

        if (queryRunDto.runQuality) {
            await query.andWhere('run_quality like :runQuality', {
                runQuality: queryRunDto.runQuality ? queryRunDto.runQuality : '%'
            });
        }

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
            .skip((+queryRunDto.pageNumber - 1 || 0) * +queryRunDto.pageSize || 0)
            .take(+queryRunDto.pageSize || 25)
            .getManyAndCount();
        return {
            runs: result[0],
            additionalInformation: {
                count: result[1],
                pageNumber: queryRunDto.pageNumber,
                pageSize: queryRunDto.pageSize
            }
        };
    }

    /**
     * Handler for getting a specific Run item from db.
     * @param id unique identifier for a Run.
     */
    async findById(id: number): Promise<Run> {
        return await this.runRepository
            .createQueryBuilder('run')
            .leftJoinAndSelect('run.logs', 'logs')
            .where('run_number = :id', { id })
            .getOne()
            .then((res: Run) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
    }

    /**
     * Link a log to a run.
     * @param linkLogToRunDto
     */
    async linkLogToRun(runNumber: number, linkLogToRunDto: LinkLogToRunDto): Promise<void> {
        const run = await this.findById(runNumber);
        if (!run) {
            throw new HttpException(
                `Run with with number ${runNumber} does not exist.`, HttpStatus.NOT_FOUND);
        }
        const log = await this.logRepository.findOne(linkLogToRunDto.logId);
        if (!log) {
            throw new HttpException(
                `Log with log number ${linkLogToRunDto.logId} does not exist.`, HttpStatus.NOT_FOUND);
        }
        run.logs = [...run.logs, log];
        await this.runRepository.save(run);
    }

    /**
     * Updates a Run. The fields nSubTimeFrames and equimentBytes are the sum of the FLPs assigend to the Run.
     * @param runNumber unique indentifier for a Run.
     * @param patchRunDto is the Dto to update a Run.
     */
    async updateRun(runNumber: number, patchRunDto: PatchRunDto): Promise<Run> {
        const runToUpdate: Run = await this.findById(runNumber);
        if (!runToUpdate) {
            throw new HttpException(
                `Run with with number ${runNumber} does not exist.`, HttpStatus.NOT_FOUND);
        }
        let accSubtimeframes = 0;
        let accBytesReadOut = 0;

        const flpArray: FlpRole[] = await this.flpRepository.createQueryBuilder()
            .where('fk_run_number = :runNumber', { runNumber })
            .getMany();

        if (flpArray !== undefined || flpArray.length !== 0) {
            for (const flp of flpArray) {
                accSubtimeframes = accSubtimeframes + flp.nSubTimeframes;
                accBytesReadOut = accBytesReadOut + flp.equipmentBytes;
            }
        }

        runToUpdate.TrgEndTime = patchRunDto.TrgEndTime;
        runToUpdate.O2EndTime = patchRunDto.O2EndTime;
        runToUpdate.runQuality = RunQuality[patchRunDto.runQuality];
        runToUpdate.nSubtimeframes = accSubtimeframes;
        runToUpdate.bytesReadOut = accBytesReadOut;

        return await this.runRepository.save(runToUpdate);
    }
    /**
     * This function gets params for
     * RunConf template
     * from database
     * @param Id1 this is ID of the first run
     * @param Id2 this is ID of the second run
     */
    async getRunConfParams(Id1: number, Id2: number): Promise<any> {

        const curDate = new Date();
        const firstResult = await this.findById(Id1);
        const secondResult = await this.findById(Id2);
        if (!firstResult) {
            throw new HttpException(
                `Run with run number ${Id1} does not exists.`, HttpStatus.NOT_FOUND
            );
        } else if (!secondResult) {
            throw new HttpException(
                `Run with run number ${Id2} does not exists.`, HttpStatus.NOT_FOUND
            );
        }
        const params = {
            Run1: firstResult.runNumber, O21: firstResult.O2StartTime,
            TargetStart1: firstResult.TrgStartTime, TargetEnd1: firstResult.TrgEndTime, o2End1: firstResult.O2EndTime,
            runType1: firstResult.runType, RunQuality1: firstResult.runQuality, NumbDetectors1: firstResult.nDetectors,
            numberFlips1: firstResult.nFlps, timeFrame1: firstResult.nTimeframes,
            SubTimeFrame1: firstResult.nSubtimeframes, Readout1: firstResult.bytesReadOut,
            Bytestimeframe1: firstResult.bytesTimeframeBuilder, Run2: secondResult.runNumber,
            O22: secondResult.O2StartTime, TargetStart2: secondResult.TrgStartTime,
            TargetEnd2: secondResult.TrgEndTime, o2End2: secondResult.O2EndTime, runType2: secondResult.runType,
            RunQuality2: secondResult.runQuality, NumbDetectors2: secondResult.nDetectors,
            numberFlips2: secondResult.nFlps, timeFrame2: secondResult.nTimeframes,
            SubTimeFrame2: secondResult.nSubtimeframes, Readout2: secondResult.bytesReadOut,
            Bytestimeframe2: secondResult.bytesTimeframeBuilder,
            Data: curDate.toLocaleString('en-GB')
        };
        return params;
    }
}
