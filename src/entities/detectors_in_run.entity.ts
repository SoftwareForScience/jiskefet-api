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
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('detectors_in_run')
export class DetectorsInRun {
    @ApiModelProperty(
        {
            type: 'integer',
        },
    )
    @ManyToOne(
        type => Run,
        run => run.detectorsInRun,
        {
            primary: true,
            eager: true,
        },
    )
    @JoinColumn({ name: 'fk_run_number' })
    run: Run;

    @ApiModelProperty(
        {
            type: 'integer',
        },
    )
    @ManyToOne(
        type => Detector,
        detector => detector.detectorsInRun,
        {
            primary: true,
            eager: true,
        },
    )
    @JoinColumn({ name: 'fk_detector_id' })
    detector: Detector;

    @ApiModelProperty(
        {
            type: 'enum',
            enum: ['test'],
        },
    )
    @Column({
        name: 'run_quality',
        type: 'enum',
        enum: ['test'],
    })
    runQuality: 'test';
}
