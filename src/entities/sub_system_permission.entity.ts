import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { SubSystem } from './sub_system.entity';
import { User } from './user.entity';

@Entity('SubSystemPermission')
export class SubSystemPermission {

    @ManyToOne(type => User, user => user.subSystemPermission, {
        eager: true,
    })
    @JoinColumn({name: 'user_id'})
    @PrimaryColumn()
    user: User;

    @ManyToOne(type => SubSystem, subSystem => subSystem.subSystemPermission, {
        eager: true,
    })
    @JoinColumn({name: 'subsystem_id'})
    @PrimaryColumn()
    subSystem: SubSystem;

    @Column({ type: 'boolean' })
    is_member: boolean;

    @Column({ type: 'boolean' })
    edit_eor_reason: boolean;
}