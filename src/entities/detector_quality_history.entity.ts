import { Entity, PrimaryGeneratedColumn, Column, Timestamp, PrimaryColumn } from 'typeorm';

@Entity('detector_qualtiy_history')
export class DetectorQualityHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    detector_quality_history_id: number;

    @PrimaryColumn({ type: 'int' })
    fk_run_number: number;

    @PrimaryColumn({ type: 'int' })
    fk_detector_id: number;

    @Column({ type: 'int' })
    fk_changed_by_user_id: number;

    @Column({ type: 'timestamp' })
    change_time: Timestamp;

    @Column({
        type: 'enum',
        enum: ['test']
    })
    run_quality: 'test';
}