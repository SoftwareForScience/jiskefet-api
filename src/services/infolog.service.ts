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
    private readonly INFO_LOG_DIR_PATH: string = 'infolog-data';

    constructor(
        @InjectRepository(InfoLog) infoLogRepository: Repository<InfoLog>,
        private readonly timeUtility: TimeUtility
    ) {
        super();
        this.ensureInfoLogDirExists();
        this.infoLogRepository = infoLogRepository;
    }

    /**
     * Saves a informative InfoLog to the database.
     * @param createInfologDto
     */
    public async logInfoLog(createInfologDto: CreateInfologDto): Promise<void> {
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
    public async logWarnInfoLog(createInfologDto: CreateInfologDto): Promise<void> {
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
    public async logErrorInfoLog(createInfologDto: CreateInfologDto): Promise<void> {
        createInfologDto.severity = 'E';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        createInfologDto.timestamp = this.timeUtility.getEpoch16();
        const infoLogEntity = plainToClass(InfoLog, createInfologDto);
        this.persist(infoLogEntity);
    }

    /**
     * Saves all the InfoLogs from the infolog-data directory to the database and deletes them from
     * the directory if successful.
     */
    public saveUnsavedInfologs(): void {
        const infoLogs = [] as InfoLog[];
        let files = [] as string[];
        files = fs.readdirSync(this.INFO_LOG_DIR_PATH);
        files.forEach(file => {
            const fileContent = fs.readFileSync(`${this.INFO_LOG_DIR_PATH}/${file}`, 'utf-8');
            infoLogs.push(JSON.parse(fileContent));
        });
        if (process.env.USE_INFO_LOGGER === 'true') {
            this.infoLogRepository.save(infoLogs).then(() => {
                const infoLog = new CreateInfologDto();
                // tslint:disable-next-line:no-trailing-whitespace
                infoLog.message = `Successfully saved InfoLogs that could not be persisted 
            to the database in the past due to a possible database outage.`;
                this.logInfoLog(infoLog);
                this.deleteInfoLogDataFiles();
            }).catch((er) => {
                throw new CouldNotSaveInfoLogFilesException(er);
            });
        }
    }

    /**
     * Persist an InfoLog to the database, or if the database is down, to a JSON file in the dir `infolog-data`.
     * @param infoLogEntity
     */
    private async persist(infoLogEntity: InfoLog): Promise<void> {
        if (process.env.USE_INFO_LOGGER === 'true') {
            this.infoLogRepository.save(infoLogEntity).then().catch(() => {
                fs.writeFile(
                    `${this.INFO_LOG_DIR_PATH}/${infoLogEntity.timestamp}.json`,
                    JSON.stringify(infoLogEntity),
                    (err) => {
                        if (err) {
                            return console.log(err);
                        }
                    });
            });
        }
    }

    /**
     * Ensures that a directory to save 'failed-to-save' InfoLogs to exists.
     */
    private async ensureInfoLogDirExists(): Promise<void> {
        if (!fs.existsSync(this.INFO_LOG_DIR_PATH)) {
            fs.mkdirSync(this.INFO_LOG_DIR_PATH);
        }
    }

    /**
     * Deletes the contents of the infolog-data directory.
     */
    private async deleteInfoLogDataFiles(): Promise<void> {
        rimraf(`${this.INFO_LOG_DIR_PATH}/*`, () => {
            const infoLog = new CreateInfologDto();
            infoLog.message = 'Infolog files are deleted from the infolog-data directory.';
            this.logInfoLog(infoLog);
        });
    }
}
