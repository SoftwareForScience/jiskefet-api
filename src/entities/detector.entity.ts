import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Detectors')
export class Detectors {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    detector_id: number;

    @Column({ type: 'varchar' })
    detector_name: string;
}