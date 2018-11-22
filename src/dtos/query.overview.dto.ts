/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

/**
 * Represents the query parameters given when executing a GET on /logs.
 */
@Entity('overview')
export class QueryOverviewDto {

    @ApiModelProperty({
        description: 'In which time range the logs of eachsubsystem should be posted',
        required: false,
    })
    @IsOptional()
    @IsNumberString()
    timeRange?: string;
}
