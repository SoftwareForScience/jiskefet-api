/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '../entities/log.entity';
import { ThreadService } from '../services/thread.service';
import { ThreadController } from '../controllers/thread.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [ThreadService],
  controllers: [ThreadController],
  exports: [ThreadService],
})
export class ThreadModule { }
