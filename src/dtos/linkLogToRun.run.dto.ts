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
 * The body required for logs to be linked to runs.
 */
@Entity('logs')
export class LinkLogToRunDto {
    @ApiModelProperty({
        example: '1',
        description: 'The id of the log to link to the run.',
    })
    logId: number;
}
