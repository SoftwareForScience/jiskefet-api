import { ApiModelProperty } from '@nestjs/swagger';
import { Log } from 'entities/log.entity';
import { IsString, IsInt } from 'class-validator';
import { User } from 'entities/user.entity';

/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

export class CreateCommentDto {
    @ApiModelProperty({
        description: 'The id of a log'
    })
    @IsInt()
    rootId: number;

    @ApiModelProperty({
        description: 'Log id of Parent comment'
    })
    parentId: number;

    @ApiModelProperty({
        description: 'Title of the comment'
    })
    @IsString()
    title: string;

    @ApiModelProperty({
        description: 'Content of the comment'
    })
    @IsString()
    text: string;

    @ApiModelProperty({
        description: 'The user\'s id'
    })
    @IsInt()
    user: number;

    constructor(data: CreateCommentDto | {} = {}) {
        Object.assign(this, data);
    }
}
