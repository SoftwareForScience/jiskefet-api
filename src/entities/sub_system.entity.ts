import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubSystemPermission } from './sub_system_permission.entity';

@Entity('sub_system')
export class SubSystem {

    @PrimaryGeneratedColumn({ name: 'subsystem_id' })
    subsystemId: number;

    @Column({ name: 'subsystem_name' })
    subsystemName: string;

    @OneToMany(type => SubSystemPermission, subSystemPermission => subSystemPermission.subSystem)
    subSystemPermissions: SubSystemPermission[];
}
