/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { SubSystemService } from '../services/susbsystem.service';
import { SubSystem } from '../entities/sub_system.entity';
import { SubSystemPermission } from '../entities/sub_system_permission.entity';

@ApiUseTags('subsystems')
@Controller('subsystems')
export class SubSystemController {
    constructor(
        private readonly subSystemService: SubSystemService) { }

    /**
     * Get all subsystem
     */
    @Get()
    async findAll(): Promise<SubSystem[]> {
        return await this.subSystemService.findAll();
    }

    /**
     * Retrieve all the subsystems by id
     * @param subSystemId number
     */
    @Get(':id')
    async findById(@Param('id') subSystemId: number): Promise<SubSystem> {
        return await this.subSystemService.findSubSystemById(subSystemId);
    }
}
