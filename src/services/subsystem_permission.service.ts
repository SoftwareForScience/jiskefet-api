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
import { ResponseObject } from '../interfaces/response_object.interface';

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
    async findTokensByExternalUserId(userId: number): Promise<SubSystemPermission[]> {
        const result = await this.repository.query(
            `SELECT sub_system_permission_id, sub_system_token_description
            FROM sub_system_permission WHERE fk_user_id = ${userId};`
        );
        const overview = new Array() as SubSystemPermission[];
        for (const r of result) {
            const subSystemPermission = {} as SubSystemPermission;
            subSystemPermission.subSystemPermissionId = r.sub_system_permission_id;
            subSystemPermission.subSystemTokenDescription = r.sub_system_token_description;
            overview.push(subSystemPermission);
        }
        return overview;
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
