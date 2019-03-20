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
        example: 1,
        description: 'The id of the run'
    })
    @IsNumber()
    runNumber: number;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date'
    })
    @IsDateString()
    O2StartTime: Date;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date'
    })
    @IsDateString()
    TrgStartTime: Date;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date'
    })
    @IsDateString()
    O2EndTime: Date;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date'
    })
    @IsDateString()
    TrgEndTime: Date;

    @ApiModelProperty({
        example: ['COSMICS'],
        description: 'What kind of run.',
        enum: ['PHYSICS' , 'COSMICS' , 'TECHNICAL'],
    })
    @IsEnum(RunType, { each: true, message: 'Each value in subtype must be a valid enum value' })
    readonly runType: string;

    @ApiModelProperty({
        example: ['Good'],
        description: 'The quality of the run.',
        enum: ['Good' , 'Bad' , 'Unknown'],
    })
    @IsEnum(RunQuality, { each: true, message: 'Each value in subtype must be a valid enum value' })
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
