import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { SubSystem } from './sub_system.entity';
import { User } from './user.entity';

@Entity('sub_system_permissions')
export class SubSystemPermission {

    @ManyToOne(type => User, user => user.subSystemPermission, {
        eager: true,
    })
    @JoinColumn({name: 'user_id'})
    @PrimaryColumn({ type: 'bigint' })
    user: User;

    @ManyToOne(type => SubSystem, subSystem => subSystem.subSystemPermission, {
        eager: true,
    })
    @JoinColumn({ name: 'subsystem_id' })
    @PrimaryColumn({ type: 'bigint' })
    subSystem: SubSystem;

    @Column({ type: 'tinyint' })
    is_member: boolean;

    @Column({ type: 'tinyint' })
    edit_eor_reason: boolean;
}