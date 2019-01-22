/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Param, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { SubSystemService } from '../services/subsystem.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseObject, CollectionResponseObject } from '../interfaces/response_object.interface';
import { createResponseItems, createResponseItem } from '../helpers/response.helper';
import { SubSystem } from '../entities/sub_system.entity';

@ApiUseTags('subsystems')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('subsystems')
export class SubSystemController {
    constructor(
        private readonly subSystemService: SubSystemService) { }

    /**
     * Get all subsystem
     */
    @Get()
    async findAll(): Promise<CollectionResponseObject<SubSystem>> {
        const getSubsystems = await this.subSystemService.findAll();
        return createResponseItems(getSubsystems);
    }

    /**
     * Retrieve all the subsystems by id
     * @param subSystemId number
     */
    @Get(':id')
    async findById(@Param('id') subSystemId: number): Promise<ResponseObject<SubSystem>> {
        const getSubsystemById = await this.subSystemService.findSubSystemById(subSystemId);
        return createResponseItem(getSubsystemById);
    }
}
