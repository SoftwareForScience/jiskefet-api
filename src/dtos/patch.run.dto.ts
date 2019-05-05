/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { IsDateString, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { RunQuality } from '../enums/run.runquality.enum';

@Entity('run')
export class PatchRunDto {
    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date at end of run',
        type: 'string',
        format: 'date-time',
    })
    @IsDateString()
    TrgEndTime: Date;

    @ApiModelProperty({
        example: new Date(),
        description: 'Current Date at end of run',
        type: 'string',
        format: 'date-time',
    })
    @IsDateString()
    O2EndTime: Date;

    @ApiModelProperty({
        example: 'Good',
        description: 'The quality of the run.',
        enum: ['Good', 'Bad', 'Unknown'],
    })
    @IsEnum(RunQuality, { each: true, message: 'Each value in subtype must be a valid enum value' })
    readonly runQuality: string; // maybe change to ['Good' | 'Bad' | 'Unknown'] so values are enforced.
}
