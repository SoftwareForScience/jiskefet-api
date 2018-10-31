/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Post, Controller, Body, Param, Query, UsePipes } from '@nestjs/common';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { LogService } from '../services/log.service';
import { CreateLogDto } from '../dtos/create.log.dto';
import { Log } from '../entities/log.entity';
import { ValidationPipe } from 'common/validation.pipe';

@ApiUseTags('logs')
@Controller('logs')
export class LogController {

    constructor(private readonly logservice: LogService) { }

    /**
     * Post a new Log item. /logs
     * @param request CreateLogDto from frontend.
     */
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() request: CreateLogDto) {
        request.creationTime = new Date();
        await this.logservice.create(request);
    }

    /**
     * Get all logs. /logs
     */
    @Get()
    @ApiImplicitQuery({ name: 'pageSize', required: false })
    @ApiImplicitQuery({ name: 'pageNumber', required: false })
    @ApiImplicitQuery({ name: 'logId', required: false })
    @ApiImplicitQuery({ name: 'searchterm', required: false })
    @ApiImplicitQuery({ name: 'subType', required: false, enum: ['run', 'subsystem', 'announcement', 'intervention', 'comment'] })
    @ApiImplicitQuery({ name: 'origin', required: false, enum: ['human', 'process'] })
    @ApiImplicitQuery({ name: 'creationTime', required: false })
    async findAll(@Query() query?: any) {
        return await this.logservice.findAll(
            query.pageSize || 25, query.pageNumber,
            query.logId, query.searchterm,
            query.subType, query.origin,
            query.creationTime);
    }

    /**
     * Find a specific Log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id')
    async findById(@Param('id') id: number): Promise<Log> {
        return await this.logservice.findLogById(id);
    }

    /**
     * Find a specific Log with the belonging Runs. /logs/id/runs
     * @param logId unique identifier for a Log item.
     */
    @Get(':id/runs')
    async findWithRuns(@Param('id') id: number): Promise<Log> {
        return await this.logservice.findLogWithRuns(id);
    }
}
