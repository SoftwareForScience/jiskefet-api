/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
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
