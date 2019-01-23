/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { RunService } from '../services/run.service';
import { CreateRunDto } from '../dtos/create.run.dto';
import { AuthGuard } from '@nestjs/passport';
import { QueryRunDto } from '../dtos/query.run.dto';
import { LinkLogToRunDto } from '../dtos/linkLogToRun.run.dto';
import { InfoLogService } from '../services/infolog.service';
import { CreateInfologDto } from '../dtos/create.infolog.dto';
import { ResponseObject, CollectionResponseObject } from '../interfaces/response_object.interface';
import { createResponseItem, createResponseItems } from '../helpers/response.helper';
import { Run } from '../entities/run.entity';

@ApiUseTags('runs')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('runs')
export class RunController {
    constructor(
        private readonly runService: RunService,
        private readonly loggerService: InfoLogService
    ) { }

    /**
     * Post a new Run into the db.
     * @param request CreateRunDto from frontend
     */
    @Post()
    async create(@Body() request: CreateRunDto): Promise<ResponseObject<Run>> {
        try {
            request.timeO2Start = new Date();
            request.timeTrgStart = new Date();
            request.timeO2End = new Date();
            request.timeTrgEnd = new Date();
            const infoLog = new CreateInfologDto();
            infoLog.message = 'A new run has been created.';
            this.loggerService.logInfoLog(infoLog);
            const run = await this.runService.create(request);
            return createResponseItem(run);
        } catch (error) {
            const infoLog = new CreateInfologDto();
            infoLog.message = 'The run could not be created';
            this.loggerService.logErrorInfoLog(infoLog);
        }
    }

    /**
     * Get all runs, with optional filters.
     * @param pageSize the amount of Runs to get (default: 50)
     * @param query optional filters
     */
    @Get()
    async findAll(@Query() query?: QueryRunDto): Promise<CollectionResponseObject<Run>> {
        const getRuns = await this.runService.findAll(query);
        return createResponseItems(getRuns.runs, undefined, getRuns.additionalInformation);
    }

    /**
     * Find a specific Log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id')
    async findById(@Param('id') id: number): Promise<ResponseObject<Run>> {
        const runById = await this.runService.findById(id);
        return createResponseItem(runById);
    }

    /**
     * Link a log to a run.
     * @param request LinkLogToRunDto
     */
    @Patch(':id/logs')
    async linkLogToRun(@Param('id') runNumber: number, @Body() request: LinkLogToRunDto): Promise<void> {
        return await this.runService.linkLogToRun(runNumber, request);
    }
}
