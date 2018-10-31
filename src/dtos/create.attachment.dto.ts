/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAttachmentDto {

    creationTime: Date;

    @ApiModelProperty({
        example: ['run'],
        description: 'What kind of log is it?',
    })
    title: string;

    @ApiModelProperty({
        example: ['run'],
        description: 'What kind of log is it?',
    })
    fileMime: string;

    @ApiModelProperty({
        example: ['run'],
        description: 'What kind of log is it?',
    })
    fileData: number;

    @ApiModelProperty({
        example: ['run'],
        description: 'What kind of log is it?',
    })
    fileMD5: string;
}
