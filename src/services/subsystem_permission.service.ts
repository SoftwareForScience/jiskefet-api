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
import { plainToClass } from 'class-transformer';
import { CreateSubSystemPermissionDto } from '../dtos/create.subsystemPermission.dto';

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
     * Retrieve a single sub system permission by id.
     * @param subSystemPermissionId number
     */
    async findSubSystemsPermissionsById(subSystemPermissionId: number): Promise<SubSystemPermission> {
        return await this.repository.createQueryBuilder()
            .where('sub_system_permission_id = :subSystemPermissionId', { subSystemPermissionId })
            .getOne();
    }

    /**
     * Retrieves all the generated tokens by user
     * @param userId number
     */
    async findTokensByUserId(userId: number): Promise<SubSystemPermission[]> {
        console.log('Doing findTokensByUserId');
        const dingen = await this.repository.createQueryBuilder('sub_system_permission')
            .where('fk_user_id = :userId', { userId })
            .select([
                'sub_system_permission.sub_system_permission_id',
                'sub_system_permission.sub_system_token_description'
            ])
            .getMany();
        console.log(dingen);
        return dingen;
    }

    /**
     * Find one subsystem by token
     * @param token string
     */
    async findOneByToken(token: string): Promise<SubSystemPermission> {
        return this.repository.createQueryBuilder()
            .where('sub_system_token = :token', { token })
            .getOne();
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
