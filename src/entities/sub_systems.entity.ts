import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('SubSystems')
export class SubSystems {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    subsystem_id: number;

    @Column({ type: 'varchar' })
    subsystem_name: string;
}