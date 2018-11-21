/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * This DTO handles the data sent from the token generation.
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean } from 'class-validator';

/**
 * This DTO is used for the front end, it takes userId instead of an user object.
 * Same goes for the Subsystem, it takes an subsystemId instead of a subsystem object
 */
export class CreateSubSystemPermissionFeDto {

    @ApiModelProperty({
        example: 8,
        description: 'Id of the user.',
    })
    @IsInt()
    userId: number;

    @ApiModelProperty({
        example: 8,
        description: 'Id of the subsystem.',
    })
    @IsInt()
    subSystem: number;

    @ApiModelProperty({
        example: true,
        description: 'If the user is a member.',
    })
    @IsBoolean()
    isMember: boolean;

    @ApiModelProperty({
        example: true,
        description: 'Reason for the end of run.',
    })
    @IsBoolean()
    editEorReason: boolean;

    @ApiModelProperty({
        example: '0f62642f-a46c-4c3a-925f-5070d8b0594e',
        description: 'A unique token for a subsystem linked to a user.',
    })
    @IsString()
    subSystemToken: string;

    @ApiModelProperty({
        example: 'Read and Write token for subsystem',
        description: 'A description for the subsystem.',
    })
    @IsString()
    subSystemTokenDescription: string;
}
