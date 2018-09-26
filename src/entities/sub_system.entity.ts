import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubSystemPermission } from './sub_system_permission.entity';

@Entity('sub_systems')
export class SubSystem {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    subsystem_id: number;

    @Column({ type: 'varchar' })
    subsystem_name: string;

    @OneToMany(type => SubSystemPermission, subSystemPermission => subSystemPermission.subSystem)
    subSystemPermission: SubSystemPermission[];
}