import { Get, Controller, UseGuards, Req, Res } from '@nestjs/common';
// import { OAuth2Service } from './services';
// import { operatorUrl } from '../app.settings';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthContoller {
    constructor(private readonly authService: AuthService) { }

    @Get('/auth')
    async Auth(@Res() response: Response) {
        await this.authService.auth(response);
    }

    @Get('/callback')
    async CallBack(@Req() request: Request, @Res() response: Response) {
        await this.authService.callback(request, response);
    }

    @Get('secret')
    @UseGuards(AuthGuard())
    protected getSecret(): string {
        return String('Secret password is : hunter12').toString();
    }
}
