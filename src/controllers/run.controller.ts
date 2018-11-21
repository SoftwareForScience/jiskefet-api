/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Body, Param, Query, UsePipes, UseGuards, Patch } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiUseTags, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RunService } from '../services/run.service';
import { CreateRunDto } from '../dtos/create.run.dto';
import { Run } from '../entities/run.entity';
import { AuthGuard } from '@nestjs/passport';
import { QueryRunDto } from '../dtos/query.run.dto';
import { LinkLogToRunDto } from '../dtos/linkLogToRun.run.dto';

@ApiUseTags('runs')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('runs')
export class RunController {
    constructor(private readonly runService: RunService) { }

    /**
     * Post a new Run into the db.
     * @param request CreateRunDto from frontend
     */
    @Post()
    async create(@Body() request: CreateRunDto): Promise<Run> {
        request.timeO2Start = new Date();
        request.timeTrgStart = new Date();
        request.timeO2End = new Date();
        request.timeTrgEnd = new Date();
        return await this.runService.create(request);
    }

    /**
     * Get all runs, with optional filters.
     * @param pageSize the amount of Runs to get (default: 50)
     * @param query optional filters
     */
    @Get()
    async findAll(@Query() query?: QueryRunDto): Promise<{runs: Run[], count: number}> {
        return await this.runService.findAll(query);
    }

    /**
     * Find a specific Log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id')
    async findById(@Param('id') id: number): Promise<Run> {
        return await this.runService.findById(id);
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
