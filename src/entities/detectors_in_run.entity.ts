import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Runs } from './runs.entity';
import { Detectors } from './detector.entity';

@Entity('DetectorsInRun')
export class DetectorsInRun {

    @ManyToOne(type => Runs, runs => runs.detectorsInRun, {
        eager: true,
    })
    @JoinColumn({name: 'run_number'})
    runs: Runs;

    @ManyToOne(type => Detectors, detectors => detectors.detectorsInRun, {
        eager: true,
    })
    @JoinColumn({name: 'detector_id'})
    detectors: Detectors;

    @Column({ type: 'enum' })
    run_quality: Enumerator;
}