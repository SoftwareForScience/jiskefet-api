/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */
/**
 * This DTO handles the data sent from the client ui.
 * In swagger it will handle example values to test the api.
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { RunType } from '../enums/run.runtype.enum';
import { RunQuality } from '../enums/run.runquality.enum';
export class CreateRunDto {

    @ApiModelProperty({
        example: 1234,
        description: 'The id of the run'
    })
    @IsNumber()
    runNumber: number;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date'
    })
    @IsDateString()
    timeO2Start: Date;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date'
    })
    @IsDateString()
    timeTrgStart: Date;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date'
    })
    @IsDateString()
    timeO2End: Date;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date'
    })
    @IsDateString()
    timeTrgEnd: Date;

    @ApiModelProperty({
        example: ['test'],
        description: 'What kind of run.',
    })
    @IsEnum(RunType, { each: true })
    readonly runType: string;

    @ApiModelProperty({
        example: ['test'],
        description: 'The quality of the run.',
    })
    @IsEnum(RunQuality, { each: true })
    readonly runQuality: string;

    @ApiModelProperty({
        example: 'Sl4e12ofb83no92ns',
        description: 'The id of the activity.',
    })
    @IsString()
    readonly activityId: string;

    @ApiModelProperty({
        example: 16,
        description: 'Number of detectors during run.',
    })
    @IsInt()
    readonly nDetectors: number;

    @ApiModelProperty({
        example: 7,
        description: 'Number of FLPs that computed data',
    })
    @IsInt()
    readonly nFlps: number;

    @ApiModelProperty({
        example: 8,
        description: 'Number of EPNs that stored data',
    })
    @IsInt()
    readonly nEpns: number;

    @ApiModelProperty({
        example: 2,
        description: 'Number of timeframes',
    })
    @IsInt()
    readonly nTimeframes: number;

    @ApiModelProperty({
        example: 4,
        description: 'Number of subtimeframes',
    })
    @IsInt()
    readonly nSubtimeframes: number;

    @ApiModelProperty({
        example: 5,
        description: 'Amount of bytes read out',
    })
    @IsInt()
    readonly bytesReadOut: number;

    @ApiModelProperty({
        example: 12,
        description: 'What builder was used.',
    })
    @IsInt()
    readonly bytesTimeframeBuilder: number;

    constructor(data: CreateRunDto | {} = {}) {
        Object.assign(this, data);
    }
}
