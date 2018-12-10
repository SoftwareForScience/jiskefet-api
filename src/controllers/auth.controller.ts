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
    Controller,
    Query,
    UnprocessableEntityException,
    HttpException,
    HttpStatus,
    BadRequestException
} from '@nestjs/common';
import {
    ApiImplicitQuery,
    ApiUseTags,
    ApiOperation,
    ApiResponse,
    ApiOkResponse,
    ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { AuthUtility } from '../utility/auth.utility';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserProfile } from '../abstracts/userprofile.abstract';
import { AuthService } from '../abstracts/auth.service.abstract';
import { AuthServiceFactory } from '../factories/auth.service.factory';

/**
 * Controller for authentication related endpoints.
 */
@ApiUseTags('authentication')
@Controller()
export class AuthContoller {
    constructor(
        private readonly authFactory: AuthServiceFactory,
        private readonly authService: AuthService,
        private readonly authUtility: AuthUtility,
        private readonly userService: UserService
    ) {
        this.authService = this.authFactory.createAuthService();
    }

    /**
     * Returns a JWT token if the grant given as a query parameter is valid.
     * @param response response object to send back to client.
     * @param query query parameters sent by client.
     */
    @Get('/auth')
    @ApiOperation({ title: 'Authenticate a user by giving an Authorization Grant.' })
    @ApiOkResponse({
        description: 'User has successfully authenticated and a JWT has been given as a response.'
    })
    @ApiUnprocessableEntityResponse({
        description: 'User has not provided an Authorization Grant as a query parameter.'
    })
    @ApiResponse({
        status: 401,
        description: 'User is unauthorized due to an invalid Authorization Grant.'
    })
    @ApiImplicitQuery({ name: 'grant', required: true })
    async auth(@Query() query?: any): Promise<{ token: string }> {
        try {
            if (!query.grant) {
                throw new UnprocessableEntityException(`Authentication failed
                , please provide an Authorization Grant as a query param.`);
            }
            const grant = query.grant;
            const jwt = await this.authService.auth(grant);
            return { token: jwt };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Returns a JWT token if the grant given as a query parameter is valid.
     * @param headers http headers given by client in GET request.
     */
    @Get('/user/profile')
    @ApiOperation({ title: 'Returns the user\'s profile' })
    @ApiOkResponse({
        description: 'User successfully received profile information.'
    })
    @ApiResponse({
        status: 401,
        description: 'User is unauthorized'
    })
    async profile(@Headers() headers: any): Promise<{ userData: User, profileData: UserProfile }> {
        try {
            const jwt = await this.authUtility.getJwtFromHeaders(headers);
            if (!jwt) {
                throw new BadRequestException('No JWT could be found in headers.');
            }
            const userProfile = await this.authService.getProfileInfo(jwt);
            const user: User = await this.userService.findUserByExternalId(userProfile.id);
            console.log(userProfile);
            return { userData: user, profileData: userProfile };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
