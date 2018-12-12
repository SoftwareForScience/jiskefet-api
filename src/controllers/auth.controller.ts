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
    BadRequestException,
    UnauthorizedException
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
    ApiImplicitQuery,
    ApiUseTags,
    ApiOperation,
    ApiResponse,
    ApiOkResponse,
    ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { GithubProfileDto } from '../dtos/github.profile.dto';
import { AuthUtility } from '../utility/auth.utility';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { BCryptService } from '../services/bcrypt.service';

/**
 * Controller for authentication related endpoints.
 */
@ApiUseTags('authentication')
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly authUtility: AuthUtility,
        private readonly userService: UserService,
        private readonly bcryptService: BCryptService,
    ) { }

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
        status: 400,
        description: 'No JWT could be found in headers.'
    })
    @ApiResponse({
        status: 401,
        description: 'User is unauthorized'
    })
    async profile(@Headers() headers: any): Promise<{ userData: User, githubData: GithubProfileDto}> {
        try {
            const jwt = await this.authUtility.getJwtFromHeaders(headers);
            if (!jwt) {
                throw new BadRequestException('No JWT could be found in headers.');
            }
            const githubProfile = await this.authService.getGithubProfileInfo(jwt);
            const user: User = await this.userService.findUserByExternalId(githubProfile.id);
            return { userData: user, githubData: githubProfile };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/test-token')
    @ApiOperation({ title: 'Returns a JWT for authorization when running end-to-end tests.' })
    @ApiOkResponse({
        description: 'The hashed secret given matches the secret in the environment and a JWT is returned.'
    })
    @ApiResponse({
        status: 400,
        description: 'The required query parameter \'hashedSecret\' is missing.'
    })
    @ApiResponse({
        status: 401,
        description: 'Hashed secret was not accepted'
    })
    @ApiImplicitQuery({ name: 'hashedSecret', required: true })
    async testToken(@Query() query?: any): Promise<{ token: string }> {
        if (query.hashedSecret === undefined) {
            throw new BadRequestException('The required query parameter \'hashedSecret\' is missing.');
        }
        const secretsMatch = await this.bcryptService.checkToken(process.env.JWT_SECRET_KEY, query.hashedSecret);
        if (secretsMatch) {
            const jwt = await this.authService.sign({ string: 'testTokenString' });
            return { token: jwt };
        } else {
            throw new UnauthorizedException('The hashed secret given does not match the secret in the environment.');
        }
    }
}
