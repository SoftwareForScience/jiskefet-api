/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsBase64, IsByteLength, IsOptional } from 'class-validator';
import { FILE_UPLOAD_LIMIT } from '../constants';

export class CreateAttachmentDto {

    @ApiModelProperty({
        type: 'string',
        format: 'date-time',
    })
    creationTime: Date;

    @ApiModelProperty({
        example: 'This is a very important file.',
        description: 'What is the name of the file?',
        required: false,
    })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiModelProperty({
        example: 'VeryImportantDocument.txt',
        description: 'Name of the uploaded file.',
    })
    fileName: string;

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
    @IsByteLength(1, FILE_UPLOAD_LIMIT * 1024 * 1024, {
        message: `File data cannot be larger than ${FILE_UPLOAD_LIMIT}MB`, // Limits the base64 string to 5MB
    })
    fileData: string;
}
