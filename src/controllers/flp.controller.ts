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
    ApiNotFoundResponse,
    ApiCreatedResponse,
    ApiConflictResponse
} from '@nestjs/swagger';
import { UseGuards, Controller, Get, Param, Patch, Post, Body, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseObject } from '../interfaces/response_object.interface';
import { FlpRole } from '../entities/flp_role.entity';
import { CreateFlpDto } from '../dtos/create.flp.dto';
import { FlpSerivce } from '../services/flp.service';
import { createResponseItem, createErrorResponse } from '../helpers/response.helper';
import { PatchFlpDto } from '../dtos/patch.flp.dto';
import { HttpExceptionFilter } from '../filters/httpexception.filter';
import { JwtAuthGuard } from '../common/auth.guard';

@ApiUseTags('flp')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('flp')
export class FlpController {

    constructor(
        private readonly flpService: FlpSerivce
    ) { }
    /**
     * Find a specific Flp. /flp/id
     * @param id unique identifier for a Flp.
     * @param name of FLP.
     */
    @Get(':name/runs/:id')
    @ApiOperation({ title: 'Returns a specific FLP based on RunId.' })
    @ApiOkResponse({ description: 'Succesfully returned an FLP.' })
    @ApiNotFoundResponse({ description: 'There is no FLP for the Run with this run number.' })
    async findById(@Param('id') runId: number, @Param('name') flpName: string): Promise<ResponseObject<FlpRole>> {
        try {
            return createResponseItem(await this.flpService.findOne(flpName, runId));
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    /**
     * Create flp with name and hostname
     * @param request CreateFlpDto
     */
    @Post()
    @ApiOperation({ title: 'Creates an FLP.' })
    @ApiCreatedResponse({ description: 'Succesfully created an FLP.' })
    @ApiConflictResponse({ description: 'An FLP already exists with this Name and Hostname.' })
    async createFlp(@Body() request: CreateFlpDto): Promise<ResponseObject<FlpRole>> {
        try {
            const flp = await this.flpService.create(request);
            return createResponseItem(flp);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    /**
     * Endpoint to update FLP values during a run
     * @param runId run number
     * @param flpName flp name
     * @param request fields to update
     */
    @Patch(':name/runs/:id')
    @ApiOperation({ title: 'Updates an FLP based on a RunId and FLPName.' })
    @ApiOkResponse({ description: 'Succesfully updated an FLP.' })
    @ApiNotFoundResponse({ description: 'The Run number or/and FLP name does not exist.' })
    async updateById(
        @Param('id') runId: number,
        @Param('name') flpName: string,
        @Body() request: PatchFlpDto): Promise<ResponseObject<FlpRole>> {
        // Update bytes that are produced for the flp (during runtime).
        try {
            const flp = await this.flpService.patch(flpName, runId, request);
            return createResponseItem(flp);
        } catch (error) {
            return createErrorResponse(error);
        }
    }
}
