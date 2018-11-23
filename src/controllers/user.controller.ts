/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Param, Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import * as uuid from 'uuid/v4';
import { SubSystemPermission } from '../entities/sub_system_permission.entity';
import { SubSystemPermissionService } from '../services/subsystem_permission.service';
import { AuthService } from '../services/auth.service';
import { BCryptService } from '../services/bcrypt.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CreateSubSystemPermissionDto } from '../dtos/create.subsystemPermission.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly subSystemPermissionService: SubSystemPermissionService,
        private readonly authService: AuthService,
        private readonly bcryptService: BCryptService,
        private readonly userService: UserService) { }

    /**
     * Retrieve a the user by id
     * @param userId number
     */
    @Get(':id')
    async findUserById(@Param('id') userId: number): Promise<User> {
        return await this.userService.findUserById(userId);
    }

    /**
     * Retrieve all the generated tokens from user
     * @param userId number
     */
    // send userId in body for a nicer url? aka github style https://github.com/settings/tokens
    @Get(':id/tokens')
    async findById(@Param('id') userId: number): Promise<SubSystemPermission[]> {
        return await this.subSystemPermissionService.findTokensByUserId(userId);
    }

    // same as above, see https://github.com/settings/tokens/new
    /**
     * Generates a token and links it to the subsystem with permissions.
     */
    @Post(':id/tokens/new')
    async generateTokenForSubsystem(@Body() request: CreateSubSystemPermissionDto): Promise<string> {
        const uniqueId: string = uuid();
        request.subSystemHash =  await this.bcryptService.hashToken(uniqueId);

        // save it to db
        const newSubSystem: SubSystemPermission =
            await this.subSystemPermissionService.saveTokenForSubSystemPermission(request);

        // add extra field to the jwt token to identify that a machine is making the request
        const jwtPayload: JwtPayload = {
            ['token']: uniqueId,
            ['is_subsystem']: 'true',
            ['permission_id']: newSubSystem.subSystemPermissionId.toString()
        };

        // create JWT
        const jwtToken: string = await this.authService.signSubSystem(jwtPayload);

        // send jwt back to user
        return jwtToken;
    }
}
