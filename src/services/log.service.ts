import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Log } from 'entities/log.entity';
import { CreateLogDto } from 'dtos/create.log.dto';

@Injectable()
export class LogService {

    private readonly repository: Repository<Log>;

    constructor(@InjectRepository(Log)
    repository: Repository<Log>) {
        this.repository = repository;
    }

    /**
     * Handler for saving a Log entity in db.
     * @param createLogDto class that carries the request data for a Log.
     */
    async create(createLogDto: CreateLogDto): Promise<Log> {
        const LogEntity = plainToClass(Log, createLogDto);
        await this.repository.save(LogEntity);
        return LogEntity;
    }

    /**
     * Handler for getting all Logs from db.
     */
    async findAllLogs(): Promise<Log[]> {
        return await this.repository.find();
    }

    /**
     * Handler for getting a specific Log item from db.
     * @param id unique identifier for a Log.
     */
    async findLogById(id: number): Promise<Log> {
        return await this.repository.createQueryBuilder()
            .where('id = :id', { id })
            .getOne()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }

    /**
     * Handler for getting a specific Log item with belonging Runs from db.
     * @param id unique identifier for a Log.
     */
    async findLogWithRuns(id: number): Promise<Log> {
        return await this.repository.createQueryBuilder()
            .leftJoinAndSelect('log.runs', 'run')
            .where('id = :id', { id })
            .getOne()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
}
