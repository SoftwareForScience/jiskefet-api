/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity('flp_role')
export class CreateFlpDto {
    @ApiModelProperty({
        example: 'FLP-TPC-1',
        description: 'Name of the flp',
    })
    @IsString()
    flpName: string;

    @ApiModelProperty({
        example: 'someserver.cern.ch',
        description: 'Name of the hostmachine, where the flp comes from.',
    })
    @IsString()
    flpHostname: string;

    @ApiModelProperty({
        example: 1,
        description: 'Attached run numbers of this log',
        type: 'object',
    })
    run: number;
}
