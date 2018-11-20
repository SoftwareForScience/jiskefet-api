/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
import { SubSystem } from './sub_system.entity';
import { User } from './user.entity';
import { SubSystemRole } from './sub_system_role.entity';

@Entity('sub_system_permission')
export class SubSystemPermission {

    @ManyToOne(
        type => User,
        user => user.subSystemPermissions,
        {
            primary: true,
            eager: true
        }
    )
    @JoinColumn({ name: 'fk_user_id' })
    user: User;

    @ManyToOne(
        type => SubSystem,
        subSystem => subSystem.subSystemPermissions,
        {
            primary: true,
            nullable: false,
            eager: true
        }
    )
    @JoinColumn({ name: 'fk_subsystem_id' })
    subSystem: SubSystem;

    @PrimaryColumn({
        name: 'sub_system_token',
        type: 'varchar'
    })
    subSystemToken: string;

    @Column({
        name: 'sub_system_description',
        type: 'varchar'
    })
    subSystemDescription: string;

    @Column({
        name: 'is_member',
        type: 'tinyint'
    })
    isMember: boolean;

    @Column({
        name: 'edit_eor_reason',
        type: 'tinyint'
    })
    editEorReason: boolean;

    @ManyToMany(type => SubSystemRole)
    @JoinTable({
        name: 'sub_system_permission_in_sub_system_role',
        joinColumn: {
            name: 'fk_sub_system_token',
            referencedColumnName: 'subSystemToken'
        },
        inverseJoinColumn: {
            name: 'fk_sub_system_role_id',
            referencedColumnName: 'subSystemRoleId'
        }
    })
    subSystemRoles: SubSystemRole[];
}
