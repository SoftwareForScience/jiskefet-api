/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

@Entity('flp')
export class CreateFlpDto {
    @ApiModelProperty({
        example: 'FLP-TPC-1',
        description: 'Name of the flp',
    })
    @IsString()
    title: string;

    @ApiModelProperty({
        example: 'someserver.cern.ch',
        description: 'Name of the hostmachine, where the flp comes from.',
    })
    @IsString()
    text: string;

    @ApiModelProperty({
        example: [1],
        description: 'Attached run numbers of this log',
    })
    runs: number[];
}
