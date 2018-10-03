import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunService } from 'services/runs.service';
import { RunController } from 'controllers/run.controller';
import { Run } from 'entities/run.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Run])],
  providers: [RunService],
  controllers: [RunController],
  exports: [RunService],
})
export class RunModule { }
