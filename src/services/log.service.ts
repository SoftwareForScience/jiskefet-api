import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Log } from 'entities/log.entity';
import { CreateLogDto } from 'dtos/create.log.dto';
import { isNullOrUndefined } from 'util';

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
    async findAll(
        pageSize: number, pageNumber?: number,
        logId?: number, searchterm?: string,
        subType?: string, origin?: string,
        creationTime?: string
    ): Promise<Log[]> {

        const sqlQuery = this.repository.createQueryBuilder();

        if (!isNullOrUndefined(logId)) {
            return await sqlQuery
                .where('log_id = :id', { id: logId })
                .getMany()
                .then(res => Promise.resolve(res))
                .catch(err => Promise.reject(err));
        } else {
            return await sqlQuery
                .where('title like :title', {
                    title: searchterm ? '%${searchterm}%' : ''
                })
                .andWhere('subtype like :subType', {
                    subType: subType ? subType : ''
                })
                .andWhere('origin like :origin', {
                    startTrg: origin ? origin : ''
                })
                .andWhere('creation_time <= :creationTime', {
                    endTrg: creationTime ? creationTime.replace('%3A', ':') : '1970-01-01'
                })
                .skip((pageNumber || 0) * pageSize)
                .take(pageSize)
                .getMany();
        }
    }

    /**
     * Handler for getting a specific Log item from db.
     * @param id unique identifier for a Log.
     */
    async findLogById(id: number): Promise<Log> {
        return await this.repository.createQueryBuilder()
            .where('logId = :id', { id })
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
            .where('logId = :id', { id })
            .getOne()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
}
