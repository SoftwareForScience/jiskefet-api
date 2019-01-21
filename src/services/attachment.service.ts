/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Attachment } from '../entities/attachment.entity';
import { CreateAttachmentDto } from '../dtos/create.attachment.dto';
import { ResponseObject } from '../interfaces/response_object.interface';

@Injectable()
export class AttachmentService {

    private readonly repository: Repository<Attachment>;

    constructor(@InjectRepository(Attachment)
    repository: Repository<Attachment>) {
        this.repository = repository;
    }

    /**
     * Handler for saving a Attachment entity in db.
     * @param createAttachmentDto class that carries the request data for a Attachment.
     */
    async create(createAttachmentDto: CreateAttachmentDto): Promise<Attachment> {
        createAttachmentDto.creationTime = new Date();
        const AttachmentEntity = plainToClass(Attachment, createAttachmentDto);
        return await this.repository.save(AttachmentEntity);
    }

    /**
     * Handler for getting a specific Run item from db.
     * @param id unique identifier for a Run.
     */
    async findAttachmentsByLogId(id: number): Promise<Attachment[]> {
        return await this.repository.createQueryBuilder()
            .where('fk_log_id = :id', { id })
            .getMany()
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
}
