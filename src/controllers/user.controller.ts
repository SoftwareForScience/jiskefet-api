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
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { SubSystemPermission } from '../entities/sub_system_permission.entity';
import { SubSystemPermissionService } from '../services/subsystem_permission.service';
import { AuthService } from '../services/auth.service';
import { BCryptService } from '../services/bcrypt.service';
import { CreateSubSystemPermissionDto } from '../dtos/create.subsystemPermission.dto';
import { SubSystemService } from '../services/susbsystem.service';
import { SubSystem } from '../entities/sub_system.entity';
import { CreateSubSystemPermissionFeDto } from 'dtos/create.subsystemPermission.fe.dto';
import { JwtPayload } from 'interfaces/jwt-payload.interface';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly subSystemPermissionService: SubSystemPermissionService,
        private readonly userService: UserService,
        private readonly subSystemService: SubSystemService,
        private readonly authService: AuthService,
        private readonly bcryptService: BCryptService) { }

    /**
     * Retrieve all the generated tokens from user
     * @param userId number
     */
    // send userId in body for a nicer url? aka github style https://github.com/settings/tokens
    @Get(':id/tokens')
    async findById(@Param('id') userId: number): Promise<SubSystemPermission[]> {
        // set default to 1 for testing purposes
        userId = 1;
        return await this.subSystemPermissionService.findTokensByUserId(userId);
    }

    // same as above, see https://github.com/settings/tokens/new
    /**
     * Generates a token and links it to the subsystem with permissions.
     */
    @Post(':id/tokens/new')
    async generateTokenForSubsystem(/*@Body() request: CreateSubSystemPermissionFeDto*/): Promise<string> {
        const userId = 1;
        const user: User = await this.userService.findUserById(userId);
        const subSystemId = 1;
        const subSystem: SubSystem = await this.subSystemService.findSubSystemById(subSystemId);
        const uniqueId: string = uuid();

        console.log(`generated uuid is: ${uniqueId}`);
        const hashedToken = await this.bcryptService.hashToken(uniqueId);
        console.log(`hashed token is ${hashedToken}`);
        // map FeDto to the original Dto with user and subsystem objects.
        const newSubSystemPermission: CreateSubSystemPermissionDto = {
            user,
            subSystem,
            subSystemHash: hashedToken,
            subSystemTokenDescription: 'random description',
            editEorReason: true,
            isMember: true
        };

        // save it to db
        const newSubSystem: SubSystemPermission =
            await this.subSystemPermissionService.saveTokenForSubSystemPermission(newSubSystemPermission);

        // add extra field to the jwt token to identify that a machine is making the request
        const jwtPayload: JwtPayload = {
            ['token']: uniqueId,
            ['is_subsystem']: 'true',
            ['permission_id']: newSubSystem.subSystemPermissionId.toString()
        };

        // create JWT
        const jwtToken: string = await this.authService.signIn(jwtPayload);

        console.log('created jwt token is based on');
        console.log(jwtPayload);
        console.log(`token is \n${jwtToken}`);

        // send jwt back to user
        return jwtToken;
    }
}
