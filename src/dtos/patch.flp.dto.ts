/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

@Entity('flp_role')
export class PatchFlpDto {
    @ApiModelProperty({
        example: 50,
        description: 'Number of subtimeframes processed in this FLP. Updated regularly.',
        type: 'integer',
        format: 'int64',
    })
    @IsNumber()
    nSubTimeframes: number;

    @ApiModelProperty({
        example: 50,
        description:
            'data volume out from the readout \'equipment\' component in bytes. Can reach PetaBytes.' +
            'Updated regularly.',
        type: 'integer',
        format: 'int64',
    })
    @IsNumber()
    equipmentBytes: number;

    @ApiModelProperty({
        example: 50,
        description:
            'data volume out from the readout \'recording\' component in bytes.' +
            'Can reach PetaBytes. Updated regularly.',
        type: 'integer',
        format: 'int64',
    })
    @IsNumber()
    recordingBytes: number;

    @ApiModelProperty({
        example: 50,
        description:
            'data volume out from the readout \'fmq\' component in bytes. Can reach PetaBytes. Updated regularly.',
        type: 'integer',
        format: 'int64',
    })
    @IsNumber()
    fairMQBytes: number;
}
