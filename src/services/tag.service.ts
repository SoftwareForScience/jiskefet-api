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
import { LinkLogToTagDto } from '../dtos/linkLogToTag.tag.dto';

@Injectable()
export class TagService {
    private readonly tagRepository: Repository<Tag>;

    constructor(
        @InjectRepository(Tag) tagRepository: Repository<Tag>
    ) {
        this.tagRepository = tagRepository;
    }

    /**
     * Creates a Tag.
     * @param createTagDto CreateTagDto for creating Tags.
     */
    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const tagEntity = plainToClass(Tag, createTagDto);
        return await this.tagRepository.save(tagEntity);
    }

    /**
     * Returns all Tags.
     * @param queryTagDto QueryTagDto for quering Tags.
     */
    async findAll(queryTagDto?: QueryTagDto): Promise<Tag[]> {
        const query = await this.tagRepository.createQueryBuilder('tag')
            .select('tag', 'tag')
            .where('tag_text like :tagText', {
                tagText: queryTagDto.tagText ? queryTagDto.tagText : '%'
            })
            .getMany();
        return query;
    }

    /**
     * Returns a Tag with given ID.
     * @param tagId is id of a Tag.
     */
    async findTagById(tagId: number): Promise<Tag> {
        const tagById = await this.tagRepository.findOne({ tagId });
        if (!tagById) {
            throw new HttpException(`Unable to find a Tag with the given Tag ID: ${tagId}`, HttpStatus.NOT_FOUND);
        }
        return tagById;
    }

    /**
     * Returns a Tag with all the Runs that contains Tag with given ID.
     * @param tagId is id of a Tag.
     */
    async findRunsByTagId(tagId: number): Promise<Tag> {
        const query = await this.tagRepository
            .createQueryBuilder('tag')
            .innerJoinAndSelect('tag.runs', 'runs')
            .where('tag_id = :tagId', { tagId })
            .getOne()
            .then((res: Tag) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
        return query;
    }

    /**
     * Returns a Tag with all the Logs that contains Tag with given ID.
     * @param tagId is id of a Tag.
     */
    async findLogsByTagId(tagId: number): Promise<Tag> {
        const query = await this.tagRepository
            .createQueryBuilder('tag')
            .innerJoinAndSelect('tag.logs', 'logs')
            .where('tag_id = :tagId', { tagId })
            .getOne()
            .then((res: Tag) => Promise.resolve(res))
            .catch((err: string) => Promise.reject(err));
        return query;
    }

    /**
     * Links a Run to a Tag with given ID.
     * @param tagId is id of a Tag.
     * @param linkRunToTagDto LinkRunToTagDto for linking a Run to a Tag.
     */
    async linkRunToTag(tagId: number, linkRunToTagDto: LinkRunToTagDto): Promise<void> {
        const runToTag = await this.tagRepository
            .createQueryBuilder()
            .relation(Tag, 'runs')
            .of(tagId)
            .add(linkRunToTagDto.runNumber);
        return runToTag;
    }

    /**
     * Links a Log to a Tag with given ID.
     * @param tagId is id of a Tag.
     * @param linkLogToTagDto LinkLogToTagDto for linking a Log to a Tag.
     */
    async linkLogToTag(tagId: number, linkLogToTagDto: LinkLogToTagDto): Promise<void> {
        const logToTag = await this.tagRepository
            .createQueryBuilder()
            .relation(Tag, 'logs')
            .of(tagId)
            .add(linkLogToTagDto.logId);
        return logToTag;
    }

    /**
     * Deletes a Tag with given ID.
     * @param tagId is id of a Tag.
     */
    async deleteTag(tagId: number): Promise<void> {
        await this.tagRepository
            .createQueryBuilder()
            .delete()
            .from(Tag)
            .where('tag_id = :tagId', { tagId })
            .execute();
    }
}
