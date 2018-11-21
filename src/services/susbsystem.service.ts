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
import { SubSystem } from '../entities/sub_system.entity';

@Injectable()
export class SubSystemService {

    private readonly repository: Repository<SubSystem>;

    constructor(@InjectRepository(SubSystem) repository: Repository<SubSystem>) {
        this.repository = repository;
    }

    /**
     * Find one subsystem by id
     * @param subSystemId number
     */
    async findSubSystemById(subSystemId: number): Promise<SubSystem> {
        return await this.repository.findOne(subSystemId);
    }

    /**
     * Handler for getting SubSystem from db.
     */
    async findAll(): Promise<SubSystem[]> {
        return await this.repository.find();
    }
}
