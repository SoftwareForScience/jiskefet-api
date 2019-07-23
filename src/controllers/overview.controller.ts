/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Controller, Get, Query, UseGuards, UseFilters } from '@nestjs/common';
import { OverviewService } from '../services/overview.service';
import { GetOverviewDto } from '../dtos/get.overview.dto';
import { QueryOverviewDto } from '../dtos/query.overview.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseObject } from '../interfaces/response_object.interface';
import { createResponseItems, createErrorResponse } from '../helpers/response.helper';
import { HttpExceptionFilter } from '../filters/httpexception.filter';
import { JwtAuthGuard } from '../common/auth.guard';

@ApiUseTags('overview')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('overview')
export class OverviewController {

    constructor(private readonly overviewService: OverviewService) { }

    /**
     * Find all Overviews that belong to a certain log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get()
    @ApiOperation({ title: 'Returns all Overviews that belong to a specific Log.' })
    @ApiOkResponse({ description: 'Succesfully returned the overview.' })
    @ApiNotFoundResponse({ description: 'Unable to find an overview with given input' })
    async find(@Query() query?: QueryOverviewDto): Promise<ResponseObject<GetOverviewDto>> {
        try {
            const overview = await this.overviewService.find(query);
            return createResponseItems(overview);
        } catch (error) {
            return createErrorResponse(error);
        }
    }
}
