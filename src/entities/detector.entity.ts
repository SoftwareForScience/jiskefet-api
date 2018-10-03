import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetectorsInRun } from './detectors_in_run.entity';
import { DetectorQualityHistory } from './detector_quality_history.entity';

@Entity('detector')
export class Detector {

    @PrimaryGeneratedColumn({name: 'detector_id'})
    detectorId: number;

    @Column({ name: 'detector_name' })
    detectorName: string;

    @OneToMany(type => DetectorsInRun, detectorsInRun => detectorsInRun.detector)
    detectorsInRun: DetectorsInRun[];

    @OneToMany(type => DetectorQualityHistory, detectorQualityHistory => detectorQualityHistory.detector)
    detectorQualityHistories: DetectorQualityHistory[];
}
