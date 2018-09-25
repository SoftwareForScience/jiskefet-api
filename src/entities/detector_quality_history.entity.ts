import { Entity, PrimaryGeneratedColumn, Column, Timestamp, PrimaryColumn } from 'typeorm';

@Entity('DetectorQualtiyHistory')
export class DetectorQualityHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    detector_quality_history_id: number;

    @PrimaryColumn({ type: 'int' })
    fk_run_number: number;

    @PrimaryColumn({ type: 'int' })
    fk_detector_id: number;

    @PrimaryColumn({ type: 'int' })
    fk_changed_by_user_id: number;

    @Column({ type: 'timestamp' })
    change_time: Timestamp;

    @Column({ type: 'enum' })
    run_quality: Enumerator;
}