import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Run } from './run.entity';
import { Detector } from './detector.entity';

@Entity('detector_qualtiy_history')
export class DetectorQualityHistory {

    @PrimaryGeneratedColumn({
        name: 'detector_quality_history_id',
        type: 'bigint'
    })
    detectorQualityHistoryId: number;

    @ManyToOne(type => Run, run => run.detectorQualityHistories)
    @PrimaryColumn({ type: 'int' })
    run: Run;

    @ManyToOne(type => Detector, detector => detector.detectorQualityHistories)
    @PrimaryColumn({ type: 'int' })
    detector: Detector;

    @Column({
        name: 'change_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    changeTime: Date;

    @Column({
        name: 'run_quality',
        type: 'enum',
        enum: ['test'],
    })
    runQuality: 'test';

    @ManyToOne(type => User, user => user.detectorQualityHistories)
    user: User;
}
