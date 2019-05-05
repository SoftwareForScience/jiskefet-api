/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards, UseFilters } from '@nestjs/common';
import { AttachmentService } from '../services/attachment.service';
import { AuthGuard } from '@nestjs/passport';
import { createResponseItems, createErrorResponse } from '../helpers/response.helper';
import { ResponseObject } from '../interfaces/response_object.interface';
import { Attachment } from '../entities/attachment.entity';
import { HttpExceptionFilter } from '../filters/httpexception.filter';

@ApiUseTags('attachments')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@UseFilters(new HttpExceptionFilter())
@Controller('attachments')
export class AttachmentController {

    constructor(
        private readonly attachmentservice: AttachmentService
    ) { }

    /**
     * Find all Attachments that belong to a certain log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id/logs')
    @ApiOperation({ title: 'Returns Attachments that belong to a specific Log.' })
    @ApiOkResponse({ description: 'Succesfully returned the Attachments.' })
    @ApiNotFoundResponse({ description: 'No Attachments found for this Log.' })
    async findById(@Param('id') logId: number): Promise<ResponseObject<Attachment>> {
        const attachmentsById = await this.attachmentservice.findAttachmentsByLogId(logId);

        try {
            // returns the fileData as base64 string, this should be done in mysql query for faster results
            for (const iterator of attachmentsById) {
                iterator.fileData = 'base64;' + iterator.fileData;
            }
            return createResponseItems(attachmentsById);
        } catch (error) {
            return createErrorResponse(error);
        }
    }
}
