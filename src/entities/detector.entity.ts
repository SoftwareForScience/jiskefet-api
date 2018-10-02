import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetectorsInRun } from './detector_in_run.entity';
import { DetectorQualityHistory } from './detector_quality_history.entity';

@Entity('detectors')
export class Detector {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    detector_id: number;

    @Column()
    detector_name: string;

    @OneToMany(type => DetectorsInRun, detectorsInRun => detectorsInRun.detector)
    detectorsInRun: DetectorsInRun[];

    @OneToMany(type => DetectorQualityHistory, detectorQualityHistory => detectorQualityHistory.detector)
    detectorQualityHistory: DetectorQualityHistory[];
}