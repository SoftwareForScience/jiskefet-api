/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { SettingService } from '../services/setting.service';
import { Setting } from '../interfaces/setting.interface';

@ApiUseTags('setting')
@Controller()
export class SettingController {

    constructor(
        private readonly settingService: SettingService,
    ) { }

    @Get('/setting')
    async getSettings(): Promise<Setting> {
        return await this.settingService.getSettings();
    }
}
