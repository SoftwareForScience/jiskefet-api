/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Get, Controller, Param, UseGuards, UseFilters } from '@nestjs/common';
import { SubSystemService } from '../services/subsystem.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseObject } from '../interfaces/response_object.interface';
import { createResponseItems, createResponseItem, createErrorResponse } from '../helpers/response.helper';
import { SubSystem } from '../entities/sub_system.entity';
import { HttpExceptionFilter } from '../filters/httpexception.filter';
import { JwtAuthGuard } from '../common/auth.guard';

@ApiUseTags('subsystems')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('subsystems')
export class SubSystemController {
    constructor(
        private readonly subSystemService: SubSystemService) { }

    /**
     * Get all subsystem
     */
    @Get()
    @ApiOperation({ title: 'Returns all Subsystems.' })
    @ApiOkResponse({ description: 'Succesfully returned Subsystems.' })
    @ApiNotFoundResponse({ description: 'No Subsystems found.' })
    async findAll(): Promise<ResponseObject<SubSystem>> {
        try {
            const getSubsystems = await this.subSystemService.findAll();
            return createResponseItems(getSubsystems);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    /**
     * Retrieve all the subsystems by id
     * @param subSystemId number
     */
    @Get(':id')
    @ApiOperation({ title: 'Returns a specific Subsystem.' })
    @ApiOkResponse({ description: 'Succesfully returned a Subsystem with given ID.' })
    @ApiNotFoundResponse({ description: 'There is no Subsystem with the given ID.' })
    async findById(@Param('id') subSystemId: number): Promise<ResponseObject<SubSystem>> {
        try {
            const getSubsystemById = await this.subSystemService.findSubSystemById(subSystemId);
            return createResponseItem(getSubsystemById);
        } catch (error) {
            return createErrorResponse(error);
        }
    }
}
