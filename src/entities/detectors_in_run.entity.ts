import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Run } from './run.entity';
import { Detector } from './detector.entity';

@Entity('detectors_in_run')
export class DetectorsInRun {

    @ManyToOne(
        type => Run, run => run.detectorsInRun,
        {
            primary: true,
            eager: true
        }
    )
    @JoinColumn({ name: 'fk_run_number' })
    run: Run;

    @ManyToOne(
        type => Detector, detector => detector.detectorsInRun,
        {
            primary: true,
            eager: true
        }
    )
    @JoinColumn({ name: 'fk_detector_id' })
    detector: Detector;

    @Column({
        name: 'run_quality',
        type: 'enum',
        enum: ['test'],
    })
    runQuality: 'test';
}
