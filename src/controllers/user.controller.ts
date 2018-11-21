/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Param, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import * as uuid from 'uuid/v4';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { SubSystemPermission } from '../entities/sub_system_permission.entity';
import { SubSystemPermissionService } from '../services/subsystem_permission.service';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly subSystemPermissionService: SubSystemPermissionService) { }

    // /**
    //  * Get all users
    //  */
    // @Get()
    // async findAll(): Promise<User[]> {
    //     return await this.userService.findAll();
    // }

    /**
     * Retrieve all the generated tokens from user
     * @param userId number
     */
    @Get(':id/tokens')
    async findById(@Param('id') userId: number): Promise<SubSystemPermission[]> {
        // set default to 1 for testing purposes
        userId = 1;
        return await this.subSystemPermissionService.findTokensByUserId(userId);
    }

    @Post(':id/tokens/new')
    async generateTokenForSubsystem(): Promise<SubSystemPermission> {
        return uuid();
    }
}
