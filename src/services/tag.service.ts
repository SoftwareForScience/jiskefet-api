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

@Injectable()
export class TagService {
    private readonly tagRepository: Repository<Tag>;
    private readonly runRepository: Repository<Run>;

    constructor(
        @InjectRepository(Tag) tagRepository: Repository<Tag>,
        @InjectRepository(Run) runRepository: Repository<Run>
    ) {
        this.tagRepository = tagRepository;
        this.runRepository = runRepository;
    }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const tagEntity = plainToClass(Tag, createTagDto);
        return await this.tagRepository.save(tagEntity);
    }

    async findAll(queryTagDto: QueryTagDto): Promise<Tag[]> {
        const query = await this.tagRepository.createQueryBuilder('tag')
            .select('tag', 'tag')
            .where('tag_text like :tagText', {
                tagText: queryTagDto.tagText ? queryTagDto.tagText : '%'
            })
            .getMany();
        return query;
    }

    async findTagById(id: number): Promise<Tag> {
        return await this.tagRepository
            .createQueryBuilder('tag')
            .where('tag_id = :id', { id })
            .getOne()
            .then((res: Tag) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
    }

    async linkRunToTag(tagId: number, linkRunToTagDto: LinkRunToTagDto): Promise<void> {
        const tag = await this.findTagById(tagId);
        if (!tag) {
            throw new HttpException(`Tag with tag number ${tagId} does not exist.`, HttpStatus.NOT_FOUND);
        }
        const run = await this.runRepository.findOne(linkRunToTagDto.runNumber);
        if (!run) {
            throw new HttpException(
                `Run with run number ${linkRunToTagDto.runNumber} does not exist.`, HttpStatus.NOT_FOUND);
        }
        tag.runs = [...tag.runs, run];
        await this.tagRepository.save(tag);
    }
}
