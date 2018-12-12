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
import { InfoLogger } from '../entities/infologger.entity';
import { plainToClass } from 'class-transformer';
import { TimeUtility } from '../utility/time.utility';
import * as fs from 'fs';

@Injectable()
export class InfoLoggerService extends Logger {

    private readonly infoLogRepository: Repository<InfoLogger>;

    constructor(
        @InjectRepository(InfoLogger) infoLogRepository: Repository<InfoLogger>,
        private readonly timeUtility: TimeUtility
    ) {
        super();
        this.infoLogRepository = infoLogRepository;
    }

    async infoLog(createInfologDto: CreateInfologDto): Promise<void> {
        createInfologDto.severity = 'I';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        createInfologDto.timestamp = this.timeUtility.getEpoch16();
        const infoLogEntity = plainToClass(InfoLogger, createInfologDto);
        this.save(infoLogEntity);
    }

    async warn(createInfologDto: CreateInfologDto): Promise<void> {
        createInfologDto.severity = 'W';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        createInfologDto.timestamp = this.timeUtility.getEpoch16();
        const infoLogEntity = plainToClass(InfoLogger, createInfologDto);
        this.save(infoLogEntity);
    }

    async error(createInfologDto: CreateInfologDto): Promise<void> {
        createInfologDto.severity = 'E';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        createInfologDto.timestamp = this.timeUtility.getEpoch16();
        const infoLogEntity = plainToClass(InfoLogger, createInfologDto);
        this.save(infoLogEntity);
    }

    private async save(infoLogEntity: InfoLogger): Promise<void> {
        // this.infoLogRepository.save(infoLogEntity).then().catch(() => {
        fs.writeFile(`infolog-data/${infoLogEntity.timestamp}.json`, JSON.stringify(infoLogEntity), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
        });
        // });

        this.read();

    }

    private async read(): Promise<void> {
        fs.readdir(`infolog-data`, (err, files) => {
            files.forEach(file => {
                console.log('hoi');
                console.log(file);
                fs.readFile(`infolog-data/${file}`, 'utf-8', (error, content) => {
                    if (error) {
                        throw new Error(error.message);
                    }
                    console.log(content);
                });
            });
        });
    }
}
