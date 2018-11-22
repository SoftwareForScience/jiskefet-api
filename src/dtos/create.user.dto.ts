/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
    externalUserId: number;
    @ApiModelProperty({
        example: '4l1c3L4R93H4Dr0NC0LL1D3R',
        description: 'Generated token from oauth provider, encoded as JWT.',
    })
    @IsString()
    token?: string;
    avatarUrl?: string;

    constructor(data: CreateUserDto | {} = {}) {
        Object.assign(this, data);
    }
}
