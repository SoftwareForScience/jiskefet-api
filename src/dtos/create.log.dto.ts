/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsEmpty, IsString } from 'class-validator';
import { SubType } from 'enums/log.subtype.enum';
import { Origin } from 'enums/log.origin.enum';

@Entity('logs')
export class CreateLogDto {

    @ApiModelProperty({
        example: ['run'],
        description: 'What kind of log is it?',
    })
    // each:true makes sure in the case more than one subtype is chosen they are all validated
    @IsEnum(SubType, { each: true, message: 'Each value in subtype must be a valid enum value' })
    subtype: [];

    @ApiModelProperty({
        example: ['human'],
        description: 'Where did the log come from?',
    })
    @IsEnum(Origin, { each: true, message: 'Each value in origin must be a valid enum value' })
    origin: [];

    @IsEmpty({ message: 'No Date can be given from the frontend.' })
    creationTime: Date;

    @ApiModelProperty({
        example: 'log for run 12',
        description: 'describes the log in short',
    })
    @IsString()
    title: string;

    @ApiModelProperty({
        example: 'lorum ipsum',
        description: 'describes the log in depth',
    })
    @IsString()
    text: string;
}
