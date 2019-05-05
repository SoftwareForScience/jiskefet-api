/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetectorsInRun } from './detectors_in_run.entity';
import { DetectorQualityHistory } from './detector_quality_history.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('detector')
export class Detector {

    @PrimaryGeneratedColumn({ name: 'detector_id' })
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    detectorId: number;

    @Column({ name: 'detector_name' })
    detectorName: string;

    @OneToMany(type => DetectorsInRun, detectorsInRun => detectorsInRun.detector)
    detectorsInRun: DetectorsInRun[];

    @OneToMany(type => DetectorQualityHistory, detectorQualityHistory => detectorQualityHistory.detector)
    detectorQualityHistories: DetectorQualityHistory[];
}
