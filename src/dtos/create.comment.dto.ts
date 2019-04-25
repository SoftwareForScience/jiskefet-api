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

/**
 * User to create based on the authentication via OAuth 2.
 * The app only saves the external (OAuth provider) ID and no additional information
 * in order to prevent redundancy.
 */
export class CreateCommentDto {
    @ApiModelProperty({
        description: 'Id of the run\'s log id'
    })
    @IsInt()
    runId: number;

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
        description: 'Id of the run\'s log id'
    })
    @IsInt()
    user: number;

    constructor(data: CreateCommentDto | {} = {}) {
        Object.assign(this, data);
    }
}
