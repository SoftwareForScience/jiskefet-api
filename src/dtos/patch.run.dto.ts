/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { RunQuality } from '../enums/run.runquality.enum';

@Entity('run')
export class PatchRunDto {
    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date at end of run'
    })
    @IsDateString()
    TrgEndTime: Date;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date at end of run'
    })
    @IsDateString()
    O2EndTime: Date;

    @ApiModelProperty({
        example: ['Good'],
        description: 'The quality of the run.',
        enum: ['Good', 'Bad', 'Unknown'],
    })
    @IsEnum(RunQuality, { each: true, message: 'Each value in subtype must be a valid enum value' })
    readonly runQuality: 'Good' | 'Bad' | 'Unknown';

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
}
