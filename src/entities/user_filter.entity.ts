/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_filter')
export class UserFilter {

    @PrimaryGeneratedColumn({ name: 'filter_id' })
    filterId: number;

    @ManyToOne(
        type => User,
        user => user.userFilters,
        {
            primary: true
        }
    )
    @JoinColumn({ name: 'fk_user_id' })
    user: User;
}
