/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */
import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

@Entity('logs')
export class CreateLogDto {

    @ApiModelProperty({
        example: ['run'],
        description: 'What kind of log is it?',
    })
    subtype: [];

    @ApiModelProperty({
        example: ['human'],
        description: 'Where did the log come from?',
    })
    origin: [];

    @ApiModelProperty({
        example: new Date(),
        description: 'Date of creation',
    })
    @IsDate() creationTime: Date;

    @ApiModelProperty({
        example: 'log for run 12',
        description: 'describes the log in short',
    })
    title: string;

    @ApiModelProperty({
        example: 'lorum ipsum',
        description: 'describes the log in depth',
    })
    text: string;
}
