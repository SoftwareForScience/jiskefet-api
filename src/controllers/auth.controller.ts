import { Get, Controller, UseGuards, Req, Res, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
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

    @Get('/logout')
    async logout(@Res() response: Response) {
        await this.authService.logout(response);
    }
}
