/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlpController } from '../controllers/flp.controller';
import { FlpRole } from '../entities/flp_role.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([FlpRole])],
    providers: [],
    controllers: [FlpController],
    exports: [],
})
export class FlpModule { }
