/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Query, UnprocessableEntityException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiImplicitQuery, ApiUseTags, ApiOperation, ApiResponse, ApiOkResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@ApiUseTags('authentication')
@Controller()
export class AuthContoller {
    constructor(private readonly authService: AuthService) { }

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
    async auth(@Query() query?: any): Promise<object> {
        try {
            if (!query.grant) {
                throw new UnprocessableEntityException('Authentication failed, please provide an Authorization Grant as a query param.');
            }
            const grant = query.grant;
            const jwt = await this.authService.auth(grant);
            return { token: jwt };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
