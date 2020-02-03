/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSystemPermission } from '../entities/sub_system_permission.entity';
import { SubSystemPermissionService } from '../services/subsystem_permission.service';

@Module({
    imports: [TypeOrmModule.forFeature([SubSystemPermission])],
    providers: [SubSystemPermissionService],
    exports: [SubSystemPermissionService],
})
export class SubSystemPermissionModule { }
