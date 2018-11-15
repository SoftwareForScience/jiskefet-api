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
import { AuthModule } from './modules/auth.module';
import { AuthService } from 'services/auth.service';
import { AuthContoller } from 'controllers/auth.controller';
import { UserModule } from './modules/user.module';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RunModule,
    LogModule,
    UserModule,
    ConfigModule,
    AuthModule,
  ],
  controllers: [AppController, RunController, LogController, AuthContoller],
  providers: [AppService, RunService, LogService, UserService, AuthService],
})
export class AppModule { }
