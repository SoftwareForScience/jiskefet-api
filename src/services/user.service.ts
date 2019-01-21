/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create.user.dto';
import { Injectable } from '@nestjs/common';
import { ResponseObject } from '../interfaces/response_object.interface';

@Injectable()
export class UserService {

    private readonly repository: Repository<User>;

    constructor(@InjectRepository(User) repository: Repository<User>) {
        this.repository = repository;
    }

    /**
     * Handler for saving the returned id to the database
     * @param createUserDto simple object that saves the oath_id
     */
    async saveUser(createUserDto: CreateUserDto): Promise<User> {
        const userEntity: User = plainToClass(User, createUserDto);
        // Todo: change this
        userEntity.samsId = 123;
        const foundUser = await this.findUserByExternalId(userEntity.externalUserId);
        if (!foundUser) {
            await this.repository.save(userEntity);
        }
        return userEntity;
    }

    /**
     * Find the user based on the id provided by external sources
     * @param externalId The external id that is associated with the user
     */
    async findUserByExternalId(externalId: number): Promise<User> {
        return await this.repository.createQueryBuilder()
            .where('external_id = :external_id', { external_id: externalId })
            .getOne();
    }

    /**
     * Find the user by its (internal, i.e. primary key in db) user id.
     * @param userId The users id
     */
    async findUserById(userId: number): Promise<User> {
        return await this.repository.createQueryBuilder()
            .where('user_id = :user_id', { user_id: userId })
            .getOne();
    }
}
