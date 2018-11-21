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
import { SubSystemPermission } from '../entities/sub_system_permission.entity';
import { CreateSubSystemPermissionDto } from '../dtos/create.subsystemPermission.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SubSystemPermissionService {

    private readonly repository: Repository<SubSystemPermission>;

    constructor(
        @InjectRepository(SubSystemPermission) repository: Repository<SubSystemPermission>,
    ) {
        this.repository = repository;
    }

    /**
     * Handler for getting SubSystem permissions from db.
     */
    async findAll(): Promise<SubSystemPermission[]> {
        return await this.repository.find();
    }

    /**
     * Retrieves all the generated tokens by user
     * @param userId number
     */
    async findTokensByUserId(userId: number): Promise<SubSystemPermission[]> {
        return await this.repository.createQueryBuilder()
            .where('fk_user_id = :userId', { userId })
            .getMany();
    }

    /**
     * Create a new token for a subsystem
     * @param subSystemPermissionDto
     */
    async saveTokenForSubSystemPermission(
        subSystemPermissionDto: CreateSubSystemPermissionDto): Promise<SubSystemPermission> {
        const newSubSystemPermission: SubSystemPermission = plainToClass(SubSystemPermission, subSystemPermissionDto);
        return this.repository.save(newSubSystemPermission);
    }
}
