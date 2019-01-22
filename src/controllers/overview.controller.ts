/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { OverviewService } from '../services/overview.service';
import { GetOverviewDto } from '../dtos/get.overview.dto';
import { QueryOverviewDto } from '../dtos/query.overview.dto';
import { AuthGuard } from '@nestjs/passport';
import { CollectionResponseObject } from '../interfaces/response_object.interface';
import { createResponseItems } from '../helpers/response.helper';

@ApiUseTags('overview')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('overview')
export class OverviewController {

    constructor(private readonly attachmentservice: OverviewService) { }

    /**
     * Find all Overviews that belong to a certain log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get()
    async find(@Query() query?: QueryOverviewDto): Promise<CollectionResponseObject<GetOverviewDto>> {
        const overview = await this.attachmentservice.find(query);
        return createResponseItems(overview);
    }
}
