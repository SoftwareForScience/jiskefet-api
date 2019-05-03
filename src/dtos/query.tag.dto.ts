/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class QueryTagDto {

    @ApiModelProperty({
        description: 'The text of the tag',
        required: false
    })
    @IsString()
    @IsOptional()
    tagText?: string;
}
