/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sub_system_role')
export class SubSystemRole {

    @PrimaryGeneratedColumn({ name: 'sub_system_role_id' })
    subSystemRoleId: number;

    @Column({
        name: 'sub_system_role_name',
        type: 'varchar'
    })
    subSystemRoleName: string;

    @Column({
        name: 'sub_system_role_description',
        type: 'varchar'
    })
    subSystemRoleDescription: string;
}
