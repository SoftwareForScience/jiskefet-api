/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsInt } from 'class-validator';
import { SubType } from '../enums/log.subtype.enum';
import { Origin } from '../enums/log.origin.enum';
import { Attachment } from '../entities/attachment.entity';

@Entity('logs')
export class CreateLogDto {
    @ApiModelProperty({
        example: 'run',
        description: 'What kind of log is it?',
        enum: ['run', 'subsystem', 'announcement', 'intervention', 'comment'],
    })
    // each:true makes sure in the case more than one subtype is chosen they are all validated
    @IsEnum(SubType, { each: true, message: 'Each value in subtype must be a valid enum value' })
    subtype: string;

    @ApiModelProperty({
        example: 'human',
        description: 'Where did the log come from?',
        enum: ['human', 'process']
    })
    @IsEnum(Origin, { each: true, message: 'Each value in origin must be a valid enum value' })
    origin: string;

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

    @ApiModelProperty({
        example: [],
        description: 'Attachments of this log',
    })
    attachments?: Attachment[];

    @ApiModelProperty({
        example: [1],
        description: 'Attached run numbers of this log',
    })
    runs: number[];

    @ApiModelProperty({
        example: '1',
        description: 'Author of log',
    })
    @IsInt()
    user: number;

    constructor(data: CreateLogDto | {} = {}) {
        Object.assign(this, data);
    }
}
