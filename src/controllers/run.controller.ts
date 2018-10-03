import { Get, Controller, Body, Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { RunService } from 'services/run.service';
import { CreateRunDto } from 'dtos/create.run.dto';
import { Run } from '../entities/run.entity';

@ApiUseTags('runs')
@Controller('runs')
export class RunController {
    constructor(private readonly runService: RunService) { }

    /**
     * Post a new Run into the db.
     * @param request CreateRunDto from frontend
     */
    @Post()
    async create(@Body() request: CreateRunDto) {
        await this.runService.create(request);
    }

    /**
     * Get all Runs from db.
     */
    @Get()
    async findAll() {
        return await this.runService.findAllRuns();
    }

    /**
     * Find a specific Log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id')
    async findById(@Param('id') id: number): Promise<Run> {
        return await this.runService.findRunById(id);
    }

}
