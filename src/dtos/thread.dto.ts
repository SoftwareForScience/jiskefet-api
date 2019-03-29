import { ApiModelProperty } from "@nestjs/swagger";

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
export class ThreadDto {
    @ApiModelProperty({
        description: 'The id of the threats topic'
    })
    rootId: number;

    @ApiModelProperty({
        description: 'The id of the comment on a thread'
    })
    parentId: number;

    @ApiModelProperty({
        description: 'Date and Time when the comment was created'
    })
    createdAt: Date;

    @ApiModelProperty({
        description: 'Title of the comment'
    })
    title: string;

    @ApiModelProperty({
        description: 'Content of the comment'
    })
    description: string;

    @ApiModelProperty({
        description: 'List of sub comments of a specific comment or thread'
    })
    comments?: ThreadDto[];
}
