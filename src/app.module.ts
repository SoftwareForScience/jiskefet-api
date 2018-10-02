import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunModule } from 'modules/run.module';
import { RunController } from 'controllers/run.controller';
import { RunService } from 'services/run.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RunModule,
  ],
  controllers: [AppController, RunController],
  providers: [AppService, RunService],
})
export class AppModule { }