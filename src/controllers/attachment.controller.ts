/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    ApiUseTags,
    ApiBearerAuth,
    ApiOperation,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiConsumes,
    ApiImplicitFile
} from '@nestjs/swagger';
import {
    Controller,
    Get,
    Param,
    UseGuards,
    UseFilters,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
    FileInterceptor,
    NotFoundException
} from '@nestjs/common';
import { AttachmentService } from '../services/attachment.service';
import { AuthGuard } from '@nestjs/passport';
import { createResponseItems, createErrorResponse, createResponseItem } from '../helpers/response.helper';
import { ResponseObject } from '../interfaces/response_object.interface';
import { Attachment } from '../entities/attachment.entity';
import { HttpExceptionFilter } from '../filters/httpexception.filter';
import { CreateAttachmentDto } from '../dtos/create.attachment.dto';
import { FileDto } from '../dtos/file.dto';
import { FILE_UPLOAD_LIMIT } from '../constants';
import { JwtAuthGuard } from '../common/auth.guard';

@ApiUseTags('attachments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('attachments')
export class AttachmentController {

    constructor(
        private readonly attachmentservice: AttachmentService
    ) { }

    /**
     * Find all Attachments that belong to a certain log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id/logs')
    @ApiOperation({ title: 'Returns Attachments that belong to a specific Log.' })
    @ApiOkResponse({ description: 'Succesfully returned the Attachments.' })
    @ApiNotFoundResponse({ description: 'No Attachments found for this Log.' })
    async findById(@Param('id') logId: number): Promise<ResponseObject<Attachment>> {
        const attachmentsById = await this.attachmentservice.findAttachmentsByLogId(logId);

        try {
            // returns the fileData as base64 string, this should be done in mysql query for faster results
            for (const iterator of attachmentsById) {
                iterator.fileData = 'base64;' + iterator.fileData;
            }
            return createResponseItems(attachmentsById);
        } catch (error) {
            return createErrorResponse(error);
        }
    }

    @Post()
    @ApiOperation({
        title: 'Creates an attachment for a log with a file upload field through the Swagger UI.',
        description: 'This endpoint is only available in dev modus'
    })
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'file', required: false })
    @UseInterceptors(FileInterceptor('file', { limits: { fileSize: FILE_UPLOAD_LIMIT * 1024 * 1024 } }))
    async uploadFile(
        @Body() logId: number,
        @UploadedFile() file?: FileDto): Promise<ResponseObject<Attachment>> {
        switch (process.env.NODE_ENV) {
            case 'dev':
                try {
                    const attachment: CreateAttachmentDto = {
                        fileName: file.originalname,
                        fileMime: file.mimetype,
                        fileData: Buffer.from(file.buffer).toString('base64'),
                        creationTime: new Date()
                    };
                    return createResponseItem(await this.attachmentservice.create(logId, attachment));
                } catch (error) {
                    return createErrorResponse(error);
                }
            default:
                throw new NotFoundException();
        }
    }
}
