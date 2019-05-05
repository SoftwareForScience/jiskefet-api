/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTagDto {

    @ApiModelProperty({
        example: '#ALICE',
        description: 'The text of the tag'
    })
    @IsString()
    tagText: string;
}
