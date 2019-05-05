/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    ApiUseTags,
    ApiBearerAuth,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiResponse
} from '@nestjs/swagger';
import {
    Get, Post, Controller, Body, Param, Query, UseGuards, Patch, UseFilters, UsePipes, ValidationPipe
} from '@nestjs/common';
import { LogService } from '../services/log.service';
import { CreateLogDto } from '../dtos/create.log.dto';
import { AuthGuard } from '@nestjs/passport';
import { QueryLogDto } from '../dtos/query.log.dto';
import { LinkRunToLogDto } from '../dtos/linkRunToLog.log.dto';
import { InfoLogService } from '../services/infolog.service';
import { CreateInfologDto } from '../dtos/create.infolog.dto';
import { ResponseObject } from '../interfaces/response_object.interface';
import { createResponseItem, createResponseItems, createErrorResponse } from '../helpers/response.helper';
import { Log } from '../entities/log.entity';
import { HttpExceptionFilter } from '../filters/httpexception.filter';
import { CreateAttachmentDto } from '../dtos/create.attachment.dto';
import { Attachment } from '../entities/attachment.entity';
import { AttachmentService } from '../services/attachment.service';

@ApiUseTags('logs')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@UseFilters(new HttpExceptionFilter())
@Controller('logs')
export class LogController {

    constructor(
        private readonly logService: LogService,
        private readonly loggerService: InfoLogService,
        private readonly attachmentService: AttachmentService
    ) { }

    /**
     * Post a new Log item. /logs
     * @param createLogDto CreateLogDto from frontend.
     */
    @Post()
    @ApiOperation({ title: 'Creates a Log.' })
    @ApiCreatedResponse({ description: 'Succesfully created a Log', type: Log })
    @ApiConflictResponse({ description: 'A Log already exists with this ID.' })
    async create(@Body() request: CreateLogDto): Promise<ResponseObject<Log>> {
        try {
            const log = await this.logService.create(request);
            return createResponseItem(log);
        } catch (error) {
            const infoLog = new CreateInfologDto();
            infoLog.message = 'Log is not properly created or saved in the database.';
            this.loggerService.logWarnInfoLog(infoLog);
            return createErrorResponse(error);
        }
    }

    /**
     * Post a new Attachment. /attachments
     * @param createAttachmentDto Data held in DTO from request body.
     */
    @Post(':id/attachments')
    @UsePipes(ValidationPipe)
    @ApiOperation({ title: 'Creates a Attachment for a specific Log.' })
    @ApiCreatedResponse({ description: 'Succesfully created an Attachment.', type: Attachment })
    async createAttachment(
        @Param('id') logId: number,
        @Body() createAttachmentDto: CreateAttachmentDto): Promise<ResponseObject<Attachment>> {
        try {
            const attachment = await this.attachmentService.create(logId, createAttachmentDto);
            return createResponseItem(attachment);
        } catch (error) {
            const infoLog = new CreateInfologDto();
            infoLog.message = 'Attachment is not correctly added.';
            this.loggerService.logWarnInfoLog(infoLog);
            return createErrorResponse(error);
        }
    }

    /**
     * Get all logs. /logs
     */
    @Get()
    @ApiOperation({ title: 'Returns all Logs.' })
    @ApiOkResponse({ description: 'Succesfully returns Logs.' })
    @ApiNotFoundResponse({ description: 'There are no Logs.' })
    async findAll(@Query() query?: QueryLogDto): Promise<ResponseObject<Log>> {
        try {
            const getLogs = await this.logService.findAll(query);
            return createResponseItems(getLogs.logs, undefined, getLogs.additionalInformation);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    /**
     * Find a specific Log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id')
    @ApiOperation({ title: 'Returns a specific Log.' })
    @ApiOkResponse({ description: 'Succesfully returns a specific Log.' })
    @ApiNotFoundResponse({ description: 'There is no Log with this ID.' })
    async findById(@Param('id') id: number): Promise<ResponseObject<Log>> {
        try {
            const logById = await this.logService.findLogById(id);
            return createResponseItem(logById);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    /**
     * Link a run to a log.
     * @param request LinkLogToRunDto
     */
    @Patch(':id/runs')
    @ApiOperation({ title: 'Links a Run to a specific Log.' })
    @ApiResponse({
        status: 204,
        description: 'Succesfully linked a Run to a Log.'
    })
    @ApiConflictResponse({ description: 'The Run is already linked to the Log.' })
    @ApiNotFoundResponse({ description: 'The Run or Log does not exist.' })
    async linkRunToLog(@Param('id') logId: number, @Body() request: LinkRunToLogDto): Promise<ResponseObject<void>> {
        try {
            const runToLog = await this.logService.linkRunToLog(logId, request);
            return createResponseItem(runToLog);
        } catch (error) {
            return createErrorResponse(error);
        }
    }
}
