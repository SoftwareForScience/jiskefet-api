import { Get, Post, Controller, Body, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { LogService } from 'services/log.service';
import { CreateLogDto } from 'dtos/create.log.dto';
import { Log } from 'entities/log.entity';

@ApiUseTags('logs')
@Controller('logs')
export class LogController {

    constructor(private readonly logservice: LogService) { }

    /**
     * Post a new Log item. /logs
     * @param request CreateLogDto from frontend.
     */
    @Post()
    async create(@Body() request: CreateLogDto) {
        await this.logservice.create(request);
    }

    /**
     * Get all logs. /logs
     */
    @Get()
    async findAll() {
        return await this.logservice.findAllLogs();
    }

    /**
     * Find a specific Log item. /logs/id
     * @param id unique identifier for a Log item.
     */
    @Get(':id')
    async findById(@Param('id') id: number): Promise<Log> {
        return await this.logservice.findLogById(id);
    }

    /**
     * Find a specific Log with the belonging Runs. /logs/id/runs
     * @param logId unique identifier for a Log item.
     */
    @Get(':id/runs')
    async findWithRuns(@Param('id') id: number): Promise<Log> {
        return await this.logservice.findLogWithRuns(id);
    }
}
