import { Get, Controller, Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { RunService } from 'services/runs.service';
import { RunDto } from 'dtos/RunDto.dto';

@ApiUseTags('Runs')
@Controller('Runs')
export class RunController {
    constructor(private readonly runService: RunService) { }

    // create a new run
    @Post()
    async create(@Body() request: RunDto) {
        await this.runService.create(request);
    }

    @Get()
    async findAll() {
        return await this.runService.findAllRuns();
    }
}