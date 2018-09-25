import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Run } from './run.entity';
import { Detector } from './detector.entity';

@Entity('DetectorsInRun')
export class DetectorsInRun {

    @ManyToOne(type => Run, run => run.detectorsInRun, {
        eager: true,
    })
    @JoinColumn({ name: 'run_number' })
    @PrimaryColumn()
    run: Run;

    @ManyToOne(type => Detector, detector => detector.detectorsInRun, {
        eager: true,
    })
    @JoinColumn({ name: 'detector_id' })
    @PrimaryColumn()
    detector: Detector;

    @Column({
        type: 'enum',
        enum: ['test']
    })
    run_quality: 'test';
}