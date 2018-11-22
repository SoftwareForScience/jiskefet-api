/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsBase64, IsByteLength } from 'class-validator';

export class CreateAttachmentDto {

    creationTime: Date;

    @ApiModelProperty({
        example: 'VeryImportantDocument.txt',
        description: 'What is the name of the file?',
    })
    @IsString()
    title: string;

    @ApiModelProperty({
        example: 'text/plain',
        description: 'What kind of file is it?',
    })
    @IsString()
    fileMime: string;

    @ApiModelProperty({
        example: 'VmVyeSBpbXBvcnRhbnQK',
        description: 'The base64 encoded file data.',
    })
    @IsBase64()
    @IsByteLength(1, 5000000, {
        message: 'File data cannot be larger than 5MB', // Limits the base64 string to 5MB
    })
    fileData: string;

    @ApiModelProperty({
        example: 1,
        description: 'The id of the corresponding Log',
    })
    logId: number;
}
