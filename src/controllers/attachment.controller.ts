/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Post, Controller, Body, Get, Param, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AttachmentService } from '../services/attachment.service';
import { CreateAttachmentDto } from '../dtos/create.attachment.dto';
import { AuthGuard } from '@nestjs/passport';
import { InfoLogService } from '../services/infolog.service';
import { CreateInfologDto } from '../dtos/create.infolog.dto';
import { createResponseItem, createResponseItems } from '../helpers/response.helper';
import { ResponseObject, CollectionResponseObject } from '../interfaces/response_object.interface';
import { Attachment } from '../entities/attachment.entity';

@ApiUseTags('attachments')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('attachments')
export class AttachmentController {

    constructor(
        private readonly attachmentservice: AttachmentService,
        private readonly loggerService: InfoLogService
    ) { }

    /**
     * Post a new Attachment. /attachments
     * @param createAttachmentDto Data held in DTO from request body.
     */
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createAttachmentDto: CreateAttachmentDto): Promise<ResponseObject<Attachment>> {
        try {
            const attachment = await this.attachmentservice.create(createAttachmentDto);
            return createResponseItem(attachment);
        } catch (error) {
            const infoLog = new CreateInfologDto();
            infoLog.message = 'Attachment is not correctly added.';
            this.loggerService.logWarnInfoLog(infoLog);
        }
    }

    /**
     * Find all Attachments that belong to a certain log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id/logs')
    async findById(@Param('id') logId: number): Promise<CollectionResponseObject<Attachment>> {
        const attachmentsById = await this.attachmentservice.findAttachmentsByLogId(logId);

        // returns the fileData as base64 string, this should be done in mysql query for faster results
        for (const iterator of attachmentsById) {
            iterator.fileData = 'base64;' + iterator.fileData;
        }
        return createResponseItems(attachmentsById);
    }
}
