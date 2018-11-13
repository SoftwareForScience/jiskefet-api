/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './services/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('/auth')
  async Auth(@Req() request: any, @Res() response: any) {
    await this.authService.auth(request, response);
  }

  @Get('/callback')
  async CallBack(@Req() request: any, @Res() response: any) {
    await this.authService.callback(request, response);
  }
}
