/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSystem } from 'entities/sub_system.entity';
import { SubSystemService } from 'services/susbsystem.service';
import { SubSystemController } from 'controllers/subsystem.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SubSystem])],
  providers: [SubSystemService],
  controllers: [SubSystemController],
  exports: [SubSystemService],
})
export class SubSystemModule { }
