/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    Get,
    Headers,
    Controller, Param, Post, Body, UseGuards, Query, BadRequestException, HttpException, HttpStatus
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import * as uuid from 'uuid/v4';
import { SubSystemPermission } from '../entities/sub_system_permission.entity';
import { SubSystemPermissionService } from '../services/subsystem_permission.service';
import { AuthService } from '../services/auth.service';
import { BCryptService } from '../services/bcrypt.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CreateSubSystemPermissionDto } from '../dtos/create.subsystemPermission.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Log } from '../entities/log.entity';
import { LogService } from '../services/log.service';
import { QueryLogDto } from '../dtos/query.log.dto';
import { GithubProfileDto } from '../dtos/github.profile.dto';
import { AuthUtility } from '../utility/auth.utility';

@ApiUseTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
    constructor(
        private readonly subSystemPermissionService: SubSystemPermissionService,
        private readonly authService: AuthService,
        private readonly bcryptService: BCryptService,
        private readonly userService: UserService,
        private readonly logService: LogService,
        private readonly authUtility: AuthUtility) { }

    /**
     * Returns a JWT token if the grant given as a query parameter is valid.
     * @param headers http headers given by client in GET request.
     */
    @Get('/profile')
    @ApiOperation({ title: 'Returns the user\'s profile' })
    @ApiOkResponse({
        description: 'User successfully received profile information.'
    })
    @ApiResponse({
        status: 401,
        description: 'User is unauthorized'
    })
    async profile(@Headers() headers: any): Promise<GithubProfileDto> {
        try {
            const jwt = await this.authUtility.getJwtFromHeaders(headers);
            if (!jwt) {
                throw new BadRequestException('No JWT could be found in headers.');
            }
            return await this.authService.getGithubProfileInfo(jwt);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Retrieve a the user by id
     * @param userId number
     */
    @Get(':id')
    async findUserByExternalId(@Param('id') userId: number): Promise<User> {
        return await this.userService.findUserByExternalId(userId);
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
    async generateTokenForSubsystem(@Body() request: CreateSubSystemPermissionDto): Promise<any> {
        const uniqueId: string = uuid();
        request.subSystemHash = await this.bcryptService.hashToken(uniqueId);

        // save it to db
        const newSubSystem: SubSystemPermission =
            await this.subSystemPermissionService.saveTokenForSubSystemPermission(request);

        // add extra field to the jwt token to identify that a machine is making the request
        const jwtPayload: JwtPayload = {
            ['token']: uniqueId,
            ['is_subsystem']: 'true',
            ['permission_id']: newSubSystem.subSystemPermissionId.toString()
        };

        // creates a jwt and returns it
        request.subSystemHash = await this.authService.signSubSystem(jwtPayload);

        return request;
    }

    /**
     * Find logs from a specific user.
     * @param userId number
     */
    @Get(':id/logs')
    async findByUserId(
        @Param('id') userId: number,
        @Query() query: QueryLogDto
    ): Promise<{ logs: Log[], count: number }> {
        return await this.logService.findLogsByUserId(userId, query);
    }
}
