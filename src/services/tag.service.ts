/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dtos/create.tag.dto';
import { plainToClass } from 'class-transformer';
import { QueryTagDto } from '../dtos/query.tag.dto';
import { LinkRunToTagDto } from '../dtos/linkRunToTag.tag.dto';
import { Run } from '../entities/run.entity';
import { LinkLogToTagDto } from '../dtos/linkLogToTag.tag.dto';
import { Log } from '../entities/log.entity';

@Injectable()
export class TagService {
    private readonly tagRepository: Repository<Tag>;
    private readonly runRepository: Repository<Run>;
    private readonly logRepository: Repository<Log>;

    constructor(
        @InjectRepository(Tag) tagRepository: Repository<Tag>,
        @InjectRepository(Run) runRepository: Repository<Run>,
        @InjectRepository(Log) logRepository: Repository<Log>
    ) {
        this.tagRepository = tagRepository;
        this.runRepository = runRepository;
        this.logRepository = logRepository;
    }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const tagEntity = plainToClass(Tag, createTagDto);
        return await this.tagRepository.save(tagEntity);
    }

    async findAll(queryTagDto?: QueryTagDto): Promise<Tag[]> {
        const query = await this.tagRepository.createQueryBuilder('tag')
            .select('tag', 'tag')
            .where('tag_text like :tagText', {
                tagText: queryTagDto.tagText ? queryTagDto.tagText : '%'
            })
            .getMany();
        return query;
    }

    async findTagById(tagId: number): Promise<Tag> {
        const tagById = await this.tagRepository.findOne({ tagId });
        if (!tagById) {
            throw new HttpException(`Unable to find a Tag with the given Tag ID: ${tagId}`, HttpStatus.NOT_FOUND);
        }
        return tagById;
    }

    async linkRunToTag(tagId: number, linkRunToTagDto: LinkRunToTagDto): Promise<void> {
        await this.tagRepository
            .createQueryBuilder()
            .relation(Tag, 'runs')
            .of(tagId)
            .add(linkRunToTagDto.runNumber);
    }

    async linkLogToTag(tagId: number, linkLogToTagDto: LinkLogToTagDto): Promise<void> {
        await this.tagRepository
            .createQueryBuilder()
            .relation(Tag, 'logs')
            .of(tagId)
            .add(linkLogToTagDto.logId);
    }
}
