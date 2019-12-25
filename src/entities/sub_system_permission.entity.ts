/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn
} from 'typeorm';
import { SubSystem } from './sub_system.entity';
import { User } from './user.entity';
import { SubSystemRole } from './sub_system_role.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('sub_system_permission')
export class SubSystemPermission {

    @PrimaryGeneratedColumn({ name: 'sub_system_permission_id' })
    @ApiModelProperty()
    subSystemPermissionId: number;

    @ApiModelProperty(
        {
            type: User,
        }
    )
    @ManyToOne(
        type => User,
        user => user.subSystemPermissions,
        {
            nullable: false,
            cascade: ['insert']
        }
    )
    @JoinColumn({
        name: 'fk_user_id'
    })
    user: User;

    @ApiModelProperty(
        {
            type: SubSystem,
        }
    )
    @ManyToOne(
        type => SubSystem,
        subSystem => subSystem.subSystemPermissions,
        {
            nullable: false,
            cascade: ['insert']
        }
    )
    @JoinColumn({
        name: 'fk_subsystem_id'
    })
    subsystem: SubSystem;

    @ApiModelProperty()
    @Column({
        name: 'sub_system_hash',
        type: 'varchar'
    })
    subSystemHash: string;

    @ApiModelProperty()
    @Column({
        name: 'sub_system_token_description',
        type: 'varchar'
    })
    subSystemTokenDescription: string;

    @ApiModelProperty()
    @Column({
        name: 'is_member',
        type: 'tinyint'
    })
    isMember: boolean;

    @ApiModelProperty()
    @Column({
        name: 'edit_eor_reason',
        type: 'tinyint'
    })
    editEorReason: boolean;

    @ApiModelProperty(
        {
            type: SubSystemRole,
            isArray: true,
        }
    )
    @ManyToMany(type => SubSystemRole)
    @JoinTable({
        name: 'sub_system_permission_in_sub_system_role',
        joinColumn: {
            name: 'fk_sub_system_permission_id',
            referencedColumnName: 'subSystemPermissionId'
        },
        inverseJoinColumn: {
            name: 'fk_sub_system_role_id',
            referencedColumnName: 'subSystemRoleId'
        }
    })
    subSystemRoles: SubSystemRole[];
}
