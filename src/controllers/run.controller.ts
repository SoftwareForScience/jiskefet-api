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
import { ResponseObject } from '../interfaces/response_object.interface';
import { createResponseItem, createResponseItems, createErrorResponse } from '../helpers/response.helper';
import { Run } from '../entities/run.entity';
import { PatchRunDto } from '../dtos/patch.run.dto';

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
            request.O2StartTime = new Date();
            request.TrgStartTime = new Date();
            const infoLog = new CreateInfologDto();
            infoLog.message = 'A new run has been created.';
            this.loggerService.logInfoLog(infoLog);
            const run = await this.runService.create(request);
            return createResponseItem(run);
        } catch (error) {
            const infoLog = new CreateInfologDto();
            infoLog.message = 'The run could not be created';
            this.loggerService.logErrorInfoLog(infoLog);
            return createErrorResponse(error);
        }
    }

    /**
     * Get all runs, with optional filters.
     * @param pageSize the amount of Runs to get (default: 50)
     * @param query optional filters
     */
    @Get()
    async findAll(@Query() query?: QueryRunDto): Promise<ResponseObject<Run>> {
        try {
            const getRuns = await this.runService.findAll(query);
            return createResponseItems(getRuns.runs, undefined, getRuns.additionalInformation);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    /**
     * Find a specific Log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id')
    async findById(@Param('id') id: number): Promise<ResponseObject<Run>> {
        try {
            const runById = await this.runService.findById(id);
            return createResponseItem(runById);
        } catch (error) {
            return createErrorResponse(error);
        }

    }

    /**
     * Link a log to a run.
     * @param request LinkLogToRunDto
     */
    @Patch(':id/logs')
    async linkLogToRun(@Param('id')
    runNumber: number, @Body() request: LinkLogToRunDto): Promise<ResponseObject<void>> {
        try {
            const logToRun = await this.runService.linkLogToRun(runNumber, request);
            return createResponseItem(logToRun);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    /**
     * Updates fields during run or at end of run.
     * @param runNumber unique indentifier for run object.
     */
    @Patch(':id')
    async updateRun(@Param('id') runNumber: number, @Body() request: PatchRunDto): Promise<ResponseObject<void>> {
        try {
            const patchRun = await this.runService.updateRun(runNumber, request);
            return createResponseItem(patchRun);
        } catch (error) {
            return createErrorResponse(error);
        }
    }
}
