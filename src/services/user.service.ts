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
import { User } from 'entities/user.entity';

@Injectable()
export class UserService {

    private readonly repository: Repository<User>;

    constructor(@InjectRepository(User) repository: Repository<User>) {
        this.repository = repository;
    }

    // /**
    //  * Handler for getting SubSystem from db.
    //  */
    // async findAll(): Promise<User[]> {
    //     return await this.repository.find();
    // }
}
