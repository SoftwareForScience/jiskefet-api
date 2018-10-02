import { Get, Controller, Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { RunService } from 'services/runs.service';
import { RunDto } from 'dtos/RunDto.dto';

@ApiUseTags('runs')
@Controller('runs')
export class RunController {
    constructor(private readonly runService: RunService) { }

    /**
     * Post a new Run into the db.
     * @param request RunDto from frontend
     */
    @Post()
    async create(@Body() request: RunDto) {
        await this.runService.create(request);
    }

    /**
     * Get all Runs from db.
     */
    @Get()
    async findAll() {
        return await this.runService.findAllRuns();
    }
}
