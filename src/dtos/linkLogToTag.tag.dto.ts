/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiModelProperty } from '@nestjs/swagger';

/**
 * The body required for logs to be linked to tags.
 */
export class LinkLogToTagDto {
    @ApiModelProperty({
        example: 1,
        description: 'The id of the log to link to the tag.',
    })
    logId: number;
}
