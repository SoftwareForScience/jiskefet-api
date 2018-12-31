/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SettingService } from '../services/setting.service';
import { Setting } from '../interfaces/setting.interface';

@ApiUseTags('setting')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class SettingController {

    constructor(
        private readonly settingService: SettingService,
    ) { }

    @Get('/setting')
    async getSettings(): Promise<Setting> {
        return await this.settingService.getSettings();
    }
}
