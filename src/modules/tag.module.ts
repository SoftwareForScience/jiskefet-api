/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { TagService } from '../services/tag.service';
import { Tag } from '../entities/tag.entity';
import { TagController } from '../controllers/tag.controller';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    providers: [TagService],
    controllers: [TagController],
    exports: [TagService],
})

export class TagModule { }
