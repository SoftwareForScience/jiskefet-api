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
import { Detector } from '../entities/detector.entity';

@Injectable()
export class InfoLoggerService extends Logger {

    private readonly infoLogRepository: Repository<InfoLogger>;

    constructor(
        @InjectRepository(InfoLogger) infoLogRepository: Repository<InfoLogger>
    ) {
        super();
        this.infoLogRepository = infoLogRepository;
    }

    async infoLog(createInfologDto: CreateInfologDto): Promise<InfoLogger> {
        createInfologDto.severity = 'I';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        createInfologDto.timestamp = new Date().getTime();
        const infoLogEntity = plainToClass(InfoLogger, createInfologDto);
        this.infoLogRepository.save(infoLogEntity);
        return infoLogEntity;
    }

    async warn(createInfologDto: CreateInfologDto): Promise<void> {
        createInfologDto.severity = 'W';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        // const time = new Date().getTime();
        // const factor = 1000;
        // createInfologDto.timestamp = (time * factor);
        // console.log(createInfologDto.timestamp);
        createInfologDto.timestamp = new Date().getTime();
        const infoLogEntity = plainToClass(InfoLogger, createInfologDto);
        this.infoLogRepository.save(infoLogEntity);
    }

    async error(createInfologDto: CreateInfologDto): Promise<void> {
        createInfologDto.severity = 'E';
        createInfologDto.level = 1;
        createInfologDto.hostname = 'jiskefet';
        createInfologDto.timestamp = new Date().getTime();
        const infoLogEntity = plainToClass(InfoLogger, createInfologDto);
        this.infoLogRepository.save(infoLogEntity);
    }
}
