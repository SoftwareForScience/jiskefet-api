/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunModule } from './modules/run.module';
import { RunController } from './controllers/run.controller';
import { RunService } from './services/run.service';
import { LogController } from './controllers/log.controller';
import { LogService } from './services/log.service';
import { LogModule } from './modules/log.module';
import { ConfigModule } from './modules/config.module';
import { SubSystemController } from 'controllers/subsystem.controller';
import { SubSystemModule } from 'modules/subsystem.module';
import { SubSystemService } from 'services/susbsystem.service';
import { AttachmentModule } from 'modules/attachment.module';
import { AttachmentController } from 'controllers/attachment.controller';
import { AttachmentService } from 'services/attachment.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RunModule,
    LogModule,
    ConfigModule,
    AttachmentModule,
    SubSystemModule
  ],
  controllers: [AppController, RunController, LogController, AttachmentController, SubSystemController],
  providers: [AppService, RunService, LogService, AttachmentService, SubSystemService],
})
export class AppModule { }
