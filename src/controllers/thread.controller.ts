/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Get, Controller, Param, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ResponseObject, CollectionResponseObject } from '../interfaces/response_object.interface';
import { createResponseItems, createResponseItem } from '../helpers/response.helper';
import { ThreadService } from '../services/thread.service';
import { ThreadDto } from 'dtos/thread.dto';

@ApiUseTags('threads')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('threads')
export class ThreadController {
    constructor(
        private readonly threadService: ThreadService) { }

    @Get(':id')
    async findAll(@Param('id') threadId: number): Promise<ResponseObject<ThreadDto>> {
        const getThreadById = await this.threadService.findThreadById(threadId);
        return createResponseItem(getThreadById);
    }
}
