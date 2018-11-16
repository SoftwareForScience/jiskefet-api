/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * The body required for runs to be linked to logs.
 */
@Entity('runs')
export class LinkRunToLogDto {
    @ApiModelProperty({
        example: '1',
        description: 'The id of the run to link to the log.',
    })
    runNumber: number;
}
