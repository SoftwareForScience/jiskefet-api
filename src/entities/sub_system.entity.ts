/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubSystemPermission } from './sub_system_permission.entity';

@Entity('sub_system')
export class SubSystem {

    @PrimaryGeneratedColumn({ name: 'subsystem_id' })
    subsystemId: number;

    @Column({ name: 'subsystem_name' })
    subsystemName: string;

    @OneToMany(type => SubSystemPermission, subSystemPermission => subSystemPermission.subsystem)
    subSystemPermissions: SubSystemPermission[];
}
