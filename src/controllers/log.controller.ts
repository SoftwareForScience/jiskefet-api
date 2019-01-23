/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Post, Controller, Body, Param, Query, UsePipes, UseGuards, ValidationPipe, Patch } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LogService } from '../services/log.service';
import { CreateLogDto } from '../dtos/create.log.dto';
import { AuthGuard } from '@nestjs/passport';
import { QueryLogDto } from '../dtos/query.log.dto';
import { LinkRunToLogDto } from '../dtos/linkRunToLog.log.dto';
import { InfoLogService } from '../services/infolog.service';
import { CreateInfologDto } from '../dtos/create.infolog.dto';
import { ResponseObject, CollectionResponseObject } from '../interfaces/response_object.interface';
import { createResponseItem, createResponseItems, createErrorResponse } from '../helpers/response.helper';
import { Log } from '../entities/log.entity';

@ApiUseTags('logs')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('logs')
export class LogController {

    constructor(
        private readonly logService: LogService,
        private readonly loggerService: InfoLogService
    ) { }

    /**
     * Post a new Log item. /logs
     * @param createLogDto CreateLogDto from frontend.
     */
    @Post()
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
     * Get all logs. /logs
     */
    @Get()
    async findAll(@Query() query?: QueryLogDto): Promise<CollectionResponseObject<Log>> {
        const getLogs = await this.logService.findAll(query);
        return createResponseItems(getLogs.logs, undefined, getLogs.additionalInformation);
    }

    /**
     * Find a specific Log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id')
    async findById(@Param('id') id: number): Promise<ResponseObject<Log>> {
        const logById = await this.logService.findLogById(id);
        return createResponseItem(logById);
    }

    /**
     * Link a run to a log.
     * @param request LinkLogToRunDto
     */
    @Patch(':id/runs')
    async linkRunToLog(@Param('id') logId: number, @Body() request: LinkRunToLogDto): Promise<void> {
        return await this.logService.linkRunToLog(logId, request);
    }
}
