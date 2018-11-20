import { Get, Controller, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiImplicitQuery } from '@nestjs/swagger';

@Controller()
export class AuthContoller {
    constructor(private readonly authService: AuthService) { }

    @Get('/auth')
    @ApiImplicitQuery({ name: 'grant', required: false })
    async auth(@Res() response: Response, @Query() query?: any) {
        const grant = query.grant;
        console.log('Auth grant received:' + grant);
        await this.authService.auth(response, grant);
    }
}
