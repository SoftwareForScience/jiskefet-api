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
        // update user if exists
        if (typeof foundUser === 'object') {
            foundUser.token = userEntity.token;
            await this.repository.save(foundUser);
            return foundUser;
        } else {
            await this.repository.save(userEntity);
            return userEntity;
        }
    }

    /**
     * find a user by Id
     * @param userId number
     */
    async findUserById(userId: number): Promise<User> {
        return await this.repository.createQueryBuilder()
            .where('user_id = :userId', { userId })
            .getOne();
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

    async findOneByToken(token: string): Promise<User> {
        return await this.repository.createQueryBuilder()
            .where('token = :token', { token })
            .getOne();
    }
}
