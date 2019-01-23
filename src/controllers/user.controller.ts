/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Param, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import * as uuid from 'uuid/v4';
import { SubSystemPermission } from '../entities/sub_system_permission.entity';
import { SubSystemPermissionService } from '../services/subsystem_permission.service';
import { BCryptService } from '../services/bcrypt.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CreateSubSystemPermissionDto } from '../dtos/create.subsystemPermission.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { LogService } from '../services/log.service';
import { QueryLogDto } from '../dtos/query.log.dto';
import { InfoLogService } from '../services/infolog.service';
import { CreateInfologDto } from '../dtos/create.infolog.dto';
import { AuthService } from '../abstracts/auth.service.abstract';
import { ResponseObject, CollectionResponseObject } from '../interfaces/response_object.interface';
import { createResponseItems, createResponseItem } from '../helpers/response.helper';
import { User } from '../entities/user.entity';
import { Collection } from 'typeorm';
import { Log } from '../entities/log.entity';

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
        private readonly loggerService: InfoLogService
    ) { }

    /**
     * Retrieve a the user by id
     * @param userId number
     */
    @Get(':id')
    async findById(@Param('id') userId: number): Promise<ResponseObject<User>> {
        const findUserById = await this.userService.findUserById(userId);
        return createResponseItem(findUserById);
    }

    /**
     * Retrieve all the generated tokens from user
     * @param userId number
     */
    @Get(':id/tokens')
    async findTokensByExternalUserId(@Param('id') userId: number):
        Promise<CollectionResponseObject<SubSystemPermission>> {
        const tokenByExternalId = await this.subSystemPermissionService.findTokensByExternalUserId(userId);
        return createResponseItems(tokenByExternalId);
    }

    /**
     * Generates a token and links it to the subsystem with permissions.
     */
    @Post(':id/tokens')
    async generateTokenForSubsystem(@Body() request: CreateSubSystemPermissionDto):
        Promise<ResponseObject<CreateSubSystemPermissionDto>> {
        const uniqueId: string = uuid();
        request.subSystemHash = await this.bcryptService.hashToken(uniqueId);

        try {
            // save it to db
            const newSubSystemPermission: SubSystemPermission =
                await this.subSystemPermissionService.saveTokenForSubSystemPermission(request);

            // add extra field to the jwt token to identify that a machine is making the request
            const jwtPayload: JwtPayload = {
                ['token']: uniqueId,
                ['is_subsystem']: 'true',
                ['permission_id']: newSubSystemPermission.subSystemPermissionId.toString()
            };

            // creates a jwt and returns it
            request.subSystemHash = await this.authService.signSubSystem(jwtPayload);

            return createResponseItem(request);
        } catch (error) {
            const infoLog = new CreateInfologDto();
            infoLog.message = 'Token could not be created.';
            this.loggerService.logWarnInfoLog(infoLog);
        }
    }

    /**
     * Find logs from a specific user.
     * @param userId number
     */
    @Get(':id/logs')
    async findLogsByUserId(
        @Param('id') userId: number, @Query() query?: QueryLogDto
    ): Promise<CollectionResponseObject<Log>> {
        const logsByUserId = await this.logService.findLogsByUserId(userId, query);
        return createResponseItems(logsByUserId.logs, undefined, logsByUserId.additionalInformation);
    }
}
