import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Run } from './run.entity';
import { Detector } from './detector.entity';

@Entity('detector_qualtiy_history')
export class DetectorQualityHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    detector_quality_history_id: number;

    @ManyToOne(type => Run, run => run.detectorQualityHistory)
    @PrimaryColumn({ type: 'int' })
    run: Run;

    @ManyToOne(type => Detector, detector => detector.detectorQualityHistory)
    @PrimaryColumn({ type: 'int' })
    detector: Detector;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    change_time: Date;

    @Column({
        type: 'enum',
        enum: ['test'],
    })
    run_quality: 'test';

    @ManyToOne(type => User, user => user.detectorQualityHistory)
    user: User;
}