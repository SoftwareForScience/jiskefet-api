/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User to create based on the authentication via OAuth 2.
 * The app only saves the external (OAuth provider) ID and no additional information
 * in order to prevent redundancy.
 */
export class CreateUserDto {
    /**
     * The user ID from the database of the OAuth provider (e.g. GitHub, Google etc.).
     */
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    externalUserId: number;

    /**
     * The user's name  from the database of the OAuth provider (e.g. GitHub, CERN etc.).
     */
    @ApiModelProperty({
        type: 'string'
    })
    name: string;
}
