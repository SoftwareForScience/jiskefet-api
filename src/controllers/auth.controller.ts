import { Get, Controller, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiImplicitQuery } from '@nestjs/swagger';

@Controller()
export class AuthContoller {
    constructor(private readonly authService: AuthService) { }

    /**
     * Returns a JWT token if the grant given as a query parameter is valid.
     * @param response response object to send back to client.
     * @param query query parameters sent by client.
     */
    @Get('/auth')
    @ApiImplicitQuery({ name: 'grant', required: true })
    async auth(@Res() response: Response, @Query() query?: any): Promise<void> {
        try {
            const grant = query.grant;
            const jwt = await this.authService.auth(grant);
            response.send({ token: jwt });
        } catch (err) {
            response.status(500).json(err);
        }
    }
}
