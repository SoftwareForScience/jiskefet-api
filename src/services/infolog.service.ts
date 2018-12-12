/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

import { Logger, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInfologDto } from '../dtos/create.infolog.dto';
import { InfoLog } from '../entities/infolog.entity';
import { plainToClass } from 'class-transformer';
import { TimeUtility } from '../utility/time.utility';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import CouldNotSaveInfoLogFilesException from '../exceptions/CouldNotSaveInfoLogFilesException';

@Injectable()
export class InfoLogService extends Logger {

    private readonly infoLogRepository: Repository<InfoLog>;

    constructor(
        @InjectRepository(InfoLog) infoLogRepository: Repository<InfoLog>,
        private readonly timeUtility: TimeUtility
    ) {
        super();
        this.infoLogRepository = infoLogRepository;
    }

    /**
     * Saves a informative InfoLog to the database.
     * @param createInfologDto
     */
    async saveInfoLog(createInfologDto: CreateInfologDto): Promise<void> {
        createInfologDto.severity = 'I';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        createInfologDto.timestamp = this.timeUtility.getEpoch16();
        const infoLogEntity = plainToClass(InfoLog, createInfologDto);
        this.persist(infoLogEntity);
    }

    /**
     * Saves a warning InfoLog to the database.
     * @param createInfologDto
     */
    async saveWarnInfoLog(createInfologDto: CreateInfologDto): Promise<void> {
        createInfologDto.severity = 'W';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        createInfologDto.timestamp = this.timeUtility.getEpoch16();
        const infoLogEntity = plainToClass(InfoLog, createInfologDto);
        this.persist(infoLogEntity);
    }

    /**
     * Saves an error InfoLog to the database.
     * @param createInfologDto
     */
    async saveErrorInfoLog(createInfologDto: CreateInfologDto): Promise<void> {
        createInfologDto.severity = 'E';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        createInfologDto.timestamp = this.timeUtility.getEpoch16();
        const infoLogEntity = plainToClass(InfoLog, createInfologDto);
        this.persist(infoLogEntity);
    }

    /**
     * Writes an InfoLog to a JSON file.
     * @param infoLogEntity
     */
    async persist(infoLogEntity: InfoLog): Promise<void> {
        this.infoLogRepository.save(infoLogEntity).then().catch(() => {
            fs.writeFile(`infolog-data/${infoLogEntity.timestamp}.json`, JSON.stringify(infoLogEntity), (err) => {
                if (err) {
                    return console.log(err);
                }
            });
        });
    }

    /**
     * Saves all the InfoLogs from the infolog-data directory to the database and deletes them from
     * the directory if successful.
     */
    public async saveUnsavedInfologs(): Promise<void> {
        const infoLogs = [] as InfoLog[];
        fs.readdir(`infolog-data`, (err, files) => {
            files.forEach(file => {
                fs.readFile(`infolog-data/${file}`, 'utf-8', async (error, data: string) => {
                    if (error) {
                        throw new Error(error.message);
                    }
                    infoLogs.push(JSON.parse(data));
                });
            });
        });
        console.log(infoLogs);
        await this.infoLogRepository.save(infoLogs).then(() => {
            const infoLog = new CreateInfologDto();
            // tslint:disable-next-line:no-trailing-whitespace
            infoLog.message = `Successfully saved InfoLogs that could not be persisted 
            to the database in the past due to a possible database outage.`;
            this.saveInfoLog(infoLog);
            this.deleteInfoLogDataFiles();
        }).catch((err) => {
            throw new CouldNotSaveInfoLogFilesException(err);
        });

    }

    /**
     * Deletes the contents of the infolog-data directory.
     */
    private async deleteInfoLogDataFiles(): Promise<void> {
        rimraf('infolog-data/*', () => {
            const infoLog = new CreateInfologDto();
            infoLog.message = 'Infolog files are deleted from the infolog-data directory.';
            this.saveInfoLog(infoLog);
        });
    }
}
