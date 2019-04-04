/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiUseTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Get, Controller, UseFilters } from '@nestjs/common';
import { SettingService } from '../services/setting.service';
import { ResponseObject } from '../interfaces/response_object.interface';
import { createResponseItem, createErrorResponse } from '../helpers/response.helper';
import { Setting } from '../interfaces/setting.interface';
import { HttpExceptionFilter } from '../filters/httpexception.filter';

@ApiUseTags('setting')
@UseFilters(new HttpExceptionFilter())
@Controller()
export class SettingController {

    constructor(
        private readonly settingService: SettingService,
    ) { }

    @Get('/setting')
    @ApiOperation({ title: 'Returns settings.' })
    @ApiOkResponse({ description: 'Succesfully returns setting.' })
    async getSettings(): Promise<ResponseObject<Setting>> {
        try {
            const setting = await this.settingService.getSettings();
            return createResponseItem(setting);
        } catch (error) {
            return createErrorResponse(error);
        }
    }
}
