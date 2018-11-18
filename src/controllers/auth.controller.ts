import { Get, Controller, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthContoller {
    constructor(private readonly authService: AuthService) { }

    @Get('/auth')
    async auth(@Res() response: Response) {
        await this.authService.auth(response);
    }

    @Get('/callback')
    async callback(@Req() req: Request, @Res() res: Response) {
        await this.authService.callback(req, res);
    }

    @Get('/logout')
    async logout(@Res() response: Response) {
        await this.authService.logout(response);
    }

    @Get('/secret')
    @UseGuards(AuthGuard())
    protected getSecret(): string {
        return String('Secret password is : hunter12').toString();
    }
}
