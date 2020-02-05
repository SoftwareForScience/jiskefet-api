/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiModelProperty } from '@nestjs/swagger';

export class GetOverviewDto {
    @ApiModelProperty({
        type: 'string',
    })
    subsystemName: string;

    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    logs: number;

    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    userId: number;

    @ApiModelProperty({
        type: 'string',
    })
    lastLog: string;

    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    logId: number;
}
