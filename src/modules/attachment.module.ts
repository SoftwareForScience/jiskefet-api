/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentService } from '../services/attachment.service';
import { AttachmentController } from '../controllers/attachment.controller';
import { Attachment } from '../entities/attachment.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Attachment])],
    providers: [AttachmentService],
    controllers: [AttachmentController],
    exports: [AttachmentService],
})
export class AttachmentModule { }
