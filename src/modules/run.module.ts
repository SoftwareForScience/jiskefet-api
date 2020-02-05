/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunService } from '../services/run.service';
import { RunController } from '../controllers/run.controller';
import { Run } from '../entities/run.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Run])],
    providers: [RunService],
    controllers: [RunController],
    exports: [RunService],
})
export class RunModule { }
