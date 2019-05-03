/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { CreateTagDto } from '../dtos/create.tag.dto';
import { Post, UseGuards, UseFilters, Controller, Body, Get, Query, Param, Patch } from '@nestjs/common';
import {
    ApiOperation,
    ApiUseTags,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiConflictResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiResponse
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from '../filters/httpexception.filter';
import { Tag } from '../entities/tag.entity';
import { ResponseObject } from '../interfaces/response_object.interface';
import { createResponseItem, createErrorResponse } from '../helpers/response.helper';
import { TagService } from '../services/tag.service';
import { async } from 'rxjs/internal/scheduler/async';
import { QueryTagDto } from '../dtos/query.tag.dto';
import { LinkRunToTagDto } from '../dtos/linkRunToTag.tag.dto';

@ApiUseTags('tags')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@UseFilters(new HttpExceptionFilter())
@Controller('tags')
export class TagController {

    constructor(
        private readonly tagService: TagService
    ) { }

    /**
     * Post a new Tag item. /tags
     * @param createTagDto CreateTagDto from front-end.
     */
    @Post()
    @ApiOperation({ title: 'Creates a Tag' })
    @ApiCreatedResponse({ description: 'Succesfully created a Tag', type: Tag })
    @ApiConflictResponse({ description: 'A Log already exists with this ID.' })
    async create(@Body() createTagDto: CreateTagDto): Promise<ResponseObject<Tag>> {
        try {
            const tag = await this.tagService.create(createTagDto);
            return createResponseItem(tag);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    /**
     * Get all Tags. /tags
     * @param query query value.
     */
    @Get()
    @ApiOperation({ title: 'Returns all Tags.' })
    @ApiOkResponse({ description: 'Successfully returned all Tags.' })
    @ApiNotFoundResponse({ description: 'There are no Tags.' })
    async findAll(@Query() query?: QueryTagDto): Promise<ResponseObject<Tag>> {
        try {
            const getTags = await this.tagService.findAll(query);
            return createResponseItem(getTags);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    /**
     * Get all Tags. /tags
     * @param query query value.
     */
    @Get(':id')
    @ApiOperation({ title: 'Returns a specific Tag.' })
    @ApiOkResponse({ description: 'Successfully returned a specific Tag.' })
    @ApiNotFoundResponse({ description: 'There is no Tag with this.' })
    async findById(@Param('id') id: number): Promise<ResponseObject<Tag>> {
        try {
            const getTagById = await this.tagService.findTagById(id);
            return createResponseItem(getTagById);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    @Patch('id/runs')
    @ApiOperation({ title: 'Links a Run to a specific Tag.' })
    @ApiResponse({
        status: 204,
        description: 'Succesfully linked a Run to a Tag.'
    })
    @ApiConflictResponse({ description: 'The Run is already linked to the Tag.' })
    @ApiNotFoundResponse({ description: 'The Run or Tag does not exist.' })
    async linkRunToTag(@Param('id') tagId: number, @Body() request: LinkRunToTagDto): Promise<ResponseObject<void>> {
        try {
            const runToTag = await this.tagService.linkRunToTag(tagId, request);
            return createResponseItem(runToTag);
        } catch (error) {
            return createErrorResponse(error);
        }
    }
}
