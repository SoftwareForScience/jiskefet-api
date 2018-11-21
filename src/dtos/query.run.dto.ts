/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsInt, IsNumberString, IsDateString } from 'class-validator';
import * as _ from 'lodash';
import { RunType } from '../enums/run.runtype.enum';
import { RunQuality } from '../enums/run.runquality.enum';
import { OrderDirection } from '../enums/orderDirection.enum';

/**
 * Represents the query parameters given when executing a GET on /runs.
 */
@Entity('runs')
export class QueryRunDto {
    @ApiModelProperty({
        description: 'On which field to order on.',
        required: false,
    })
    @IsOptional()
    orderBy?: string;

    @ApiModelProperty({
        description: 'The order direction, either ascending or descending.',
        enum: _.values(OrderDirection),
        required: false,
    })
    @IsEnum(OrderDirection, {
        each: true,
        message: `orderDirection must be of enum string types:
            ${_.values(OrderDirection).map((x: OrderDirection) => x)}.`
    })
    @IsOptional()
    orderDirection?: OrderDirection;

    @ApiModelProperty({
        description: 'The maximum amount of logs in each result.',
        default: '25',
        required: false,
    })
    @IsNumberString()
    pageSize: string = '25';

    @ApiModelProperty({
        description: 'The current page, i.e. the offset in the result set based on pageSize.',
        default: '1',
        required: false,
    })
    @IsNumberString()
    pageNumber: string = '1';

    @ApiModelProperty({
        description: 'The id of the log.',
        required: false,
    })
    @IsNumberString()
    @IsOptional()
    runNumber?: string;

    @ApiModelProperty({
        description: 'The lower bound of the timeO2Start filter range.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    startTimeO2Start?: Date;

    @ApiModelProperty({
        description: 'The upper bound of the timeO2Start filter range.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    endTimeO2Start?: Date;

    @ApiModelProperty({
        description: 'The lower bound of the timeTrgStart filter range.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    startTimeTrgStart?: Date;

    @ApiModelProperty({
        description: 'The upper bound of the timeTrgStart filter range.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    endTimeTrgStart?: Date;

    @ApiModelProperty({
        description: 'The lower bound of the timeTrgEnd filter range.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    startTimeTrgEnd?: Date;

    @ApiModelProperty({
        description: 'The upper bound of the timeTrgEnd filter range.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    endTimeTrgEnd?: Date;

    @ApiModelProperty({
        description: 'The lower bound of the timeO2End filter range.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    startTimeO2End?: Date;

    @ApiModelProperty({
        description: 'The upper bound of the timeO2End filter range.',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    endTimeO2End?: Date;

    @ApiModelProperty({
        description: 'The id of the activity.',
        required: false,
    })
    @IsOptional()
    @IsNumberString()
    activityId?: string;

    @ApiModelProperty({
        description: 'The type of the run.',
        required: false,
    })
    @IsOptional()
    @IsEnum(RunType, { each: true, message: 'Runtype must be a valid enum type.' })
    runType?: RunType;

    @ApiModelProperty({
        description: 'The quality of the run.',
        required: false,
    })
    @IsOptional()
    @IsEnum(RunQuality, { each: true, message: 'Run quality must be a valid enum type.' })
    runQuality?: RunQuality;

    // --- Not yet determined if these filters are needed. ---

    // @ApiModelProperty({
    //     description: 'The number of detectors',
    //     required: false,
    // })
    // @IsOptional()
    // @IsNumberString()
    // nDetectors?: number;

    // @ApiModelProperty({
    //     description: 'The number of FLPs.',
    //     required: false,
    // })
    // @IsOptional()
    // @IsNumberString()
    // nFlps?: number;

    // @ApiModelProperty({
    //     description: 'The number of EPNs.',
    //     required: false,
    // })
    // @IsOptional()
    // @IsNumberString()
    // nEpns?: number;

    // @ApiModelProperty({
    //     description: 'The number of timeframes.',
    //     required: false,
    // })
    // @IsOptional()
    // @IsNumberString()
    // nTimeframes?: number;

    // @ApiModelProperty({
    //     description: 'The number of sub-timeframes.',
    //     required: false,
    // })
    // @IsOptional()
    // @IsNumberString()
    // nSubtimeframes?: number;

    // @ApiModelProperty({
    //     description: 'The number of bytes read out.',
    //     required: false,
    // })
    // @IsOptional()
    // @IsNumberString()
    // bytesReadOut?: number;

    // @ApiModelProperty({
    //     description: 'The number of timeframe builder bytes.',
    //     required: false,
    // })
    // @IsOptional()
    // @IsNumberString()
    // bytesTimeframeBuilder?: number;

    // tags: Tag[];

    // logs: Log[];

    // epnRoleSessions: EpnRoleSession[];

    // flpRoles: FlpRole[];

    // detectorsInRun: DetectorsInRun[];

    // detectorQualityHistories: DetectorQualityHistory[];

    // runQualityHistories: RunQualityHistory[];

    // runEorHistories: RunEorHistory[];
}
