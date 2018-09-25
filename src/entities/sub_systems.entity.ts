import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubSystemPermissions } from './sub_system_permissions.entity';

@Entity('SubSystems')
export class SubSystems {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    subsystem_id: number;

    @Column({ type: 'varchar' })
    subsystem_name: string;

    @OneToMany(type => SubSystemPermissions, subSystemPermissions => subSystemPermissions.subSystems)
    subSystemPermissions: SubSystemPermissions[];
}