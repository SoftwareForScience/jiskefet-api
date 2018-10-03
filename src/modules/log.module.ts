import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogService } from 'services/log.service';
import { LogController } from 'controllers/log.controller';
import { Log } from 'entities/log.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LogService],
  controllers: [LogController],
  exports: [LogService],
})

export class LogModule { }
