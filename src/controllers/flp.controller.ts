/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards, Controller, Get, Param, HttpException, HttpStatus, Patch, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseObject } from '../interfaces/response_object.interface';
import { FlpRole } from '../entities/flp_role.entity';
import { CreateFlpDto } from '../dtos/create.flp.dto';

@ApiUseTags('flp')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('flp')
export class FlpController {

    /**
     * Find a specific Flp. /flp/id
     * @param id unique identifier for a Flp.
     * @param name of FLP.
     */
    @Get(':id')
    async findById(@Param('id') runId: number, flpName: string): Promise<ResponseObject<FlpRole>> {
        // Aggegrate readout bytes so it can be updated for the run table,
        // aswell as the number of timeframes and subtimeframes.
        throw new HttpException(`Endpoint is not yet implemented.`, HttpStatus.NOT_IMPLEMENTED);
    }

    /**
     * Create flp with name and hostname
     * @param request CreateFlpDto
     */
    @Post()
    async createFlp(@Body() request: CreateFlpDto): Promise<ResponseObject<FlpController>> {
        // Create initial Flp with a name and hostname.
        throw new HttpException(`Endpoint is not yet implemented.`, HttpStatus.NOT_IMPLEMENTED);
    }

    /**
     * During
     * @param runId unique identifier for updating flp
     * @param flpName name of a FLP.
     */
    @Patch(':id')
    async updateById(@Param(':id') runId: number, flpName: string): Promise<ResponseObject<void>> {
        // Update bytes that are produced for the flp (during runtime).
        throw new HttpException(`Endpoint is not yet implemented.`, HttpStatus.NOT_IMPLEMENTED);
    }
}
