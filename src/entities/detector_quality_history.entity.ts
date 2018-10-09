import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Run } from './run.entity';
import { Detector } from './detector.entity';

@Entity('detector_quality_history')
export class DetectorQualityHistory {

    @PrimaryGeneratedColumn({ name: 'detector_quality_history_id' })
    detectorQualityHistoryId: number;

    @ManyToOne(
        type => Run,
        run => run.detectorQualityHistories,
        {
            primary: true
        }
    )
    @JoinColumn({ name: 'fk_run_number' })
    run: Run;

    @ManyToOne(
        type => Detector,
        detector => detector.detectorQualityHistories,
        {
            primary: true
        }
    )
    @JoinColumn({ name: 'fk_detector_id' })
    detector: Detector;

    @ManyToOne(
        type => User,
        user => user.detectorQualityHistories,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'fk_changed_by_user_id' })
    user: User;

    @Column({
        name: 'change_time',
        precision: 0,
    })
    changeTime: Date;

    @Column({
        name: 'run_quality',
        type: 'enum',
        enum: ['test'],
    })
    runQuality: 'test';
}
