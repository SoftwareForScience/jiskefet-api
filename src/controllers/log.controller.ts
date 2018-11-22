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
import { Log } from '../entities/log.entity';
import { AuthGuard } from '@nestjs/passport';
import { QueryLogDto } from '../dtos/query.log.dto';
import { LinkRunToLogDto } from '../dtos/linkRunToLog.log.dto';

@ApiUseTags('logs')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('logs')
export class LogController {

    constructor(private readonly logService: LogService) { }

    /**
     * Post a new Log item. /logs
     * @param createLogDto CreateLogDto from frontend.
     */
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() request: CreateLogDto): Promise<Log> {
        return await this.logService.create(request);
    }

    /**
     * Get all logs. /logs
     */
    @Get()
    @UsePipes(ValidationPipe)
    async findAll(@Query() query?: QueryLogDto): Promise<{ logs: Log[], count: number }> {
        return await this.logService.findAll(query);
    }

    /**
     * Find a specific Log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id')
    async findById(@Param('id') id: number): Promise<Log> {
        return await this.logService.findLogById(id);
    }

    /**
     * Link a run to a log.
     * @param request LinkLogToRunDto
     */
    @Patch(':id/runs')
    @UsePipes(ValidationPipe)
    async linkRunToLog(@Param('id') logId: number, @Body() request: LinkRunToLogDto): Promise<void> {
        return await this.logService.linkRunToLog(logId, request);
    }
}
