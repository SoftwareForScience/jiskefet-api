import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SubSystems } from './sub_systems.entity';
import { Users } from './users.entity';

@Entity('SubSystemPermissions')
export class SubSystemPermissions {

    @ManyToOne(type => Users, users => users.subSystemPermissions, {
        eager: true,
    })
    @JoinColumn({name: 'user_id'})
    users: Users;

    @ManyToOne(type => SubSystems, subSystems => subSystems.subSystemPermissions, {
        eager: true,
    })
    @JoinColumn({name: 'subsystem_id'})
    subSystems: SubSystems;

    @Column({ type: 'boolean' })
    is_member: boolean;

    @Column({ type: 'boolean' })
    edit_eor_reason: boolean;
}