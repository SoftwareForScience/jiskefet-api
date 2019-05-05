/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Column, Entity, ManyToMany, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';
import { Log } from './log.entity';
import { EpnRoleSession } from './epn_role_session.entity';
import { FlpRole } from './flp_role.entity';
import { DetectorsInRun } from './detectors_in_run.entity';
import { DetectorQualityHistory } from './detector_quality_history.entity';
import { RunQualityHistory } from './run_quality_history.entity';
import { RunEorHistory } from './run_eor_history.entity';
import { Tag } from './tag.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('run')
export class Run {

    @PrimaryColumn({
        name: 'run_number'
    })
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    runNumber: number;

    @Column({
        name: 'o2_start_time',
        precision: 0,
    })
    @ApiModelProperty({
        type: 'string',
        format: 'date-time',
    })
    O2StartTime: Date;

    @Column({
        name: 'trg_start_time',
        precision: 0,
    })
    @ApiModelProperty({
        type: 'string',
        format: 'date-time',
    })
    TrgStartTime: Date;

    @Column({
        name: 'trg_end_time',
        precision: 0,
        nullable: true,
    })
    @ApiModelProperty({
        required: false,
        type: 'string',
        format: 'date-time'
    })
    TrgEndTime: Date;

    @Column({
        name: 'o2_end_time',
        precision: 0,
        nullable: true,
    })
    @ApiModelProperty({
        required: false,
        type: 'string',
        format: 'date-time'
    })
    O2EndTime: Date;

    @Column({
        name: 'activity_id',
        type: 'char',
        length: 64
    })
    @ApiModelProperty()
    activityId: string;

    @Column({
        name: 'run_type',
        type: 'enum',
        enum: [
            'PHYSICS',
            'COSMICS',
            'TECHNICAL'
        ],
    })
    @ApiModelProperty()
    runType: ['PHYSICS' | 'COSMICS' | 'TECHNICAL'];

    @Column({
        name: 'run_quality',
        type: 'enum',
        enum: [
            'Good',
            'Bad',
            'Unknown'
        ],
        nullable: true,
    })
    @ApiModelProperty({ required: false})
    runQuality: ['Good' | 'Bad' | 'Unknown'];

    @Column({ name: 'n_detectors' })
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    nDetectors: number;

    @Column({ name: 'n_flps' })
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    nFlps: number;

    @Column({ name: 'n_epns' })
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    nEpns: number;

    @Column({
        name: 'n_timeframes',
        nullable: true,
    })
    @ApiModelProperty({
        required: false,
        type: 'integer',
        format: 'int64',
    })
    nTimeframes: number;

    @Column({
        name: 'n_subtimeframes',
        nullable: true,
    })
    @ApiModelProperty({
        required: false,
        type: 'integer',
        format: 'int64',
    })
    nSubtimeframes: number;

    @Column({
        name: 'bytes_read_out',
        nullable: true,
    })
    @ApiModelProperty({
        required: false,
        type: 'integer',
        format: 'int64',
    })
    bytesReadOut: number;

    @Column({
        name: 'bytes_timeframe_builder',
        nullable: true,
    })
    @ApiModelProperty({
        required: false,
        type: 'integer',
        format: 'int64',
    })
    bytesTimeframeBuilder: number;

    @ManyToMany(type => Tag, tag => tag.runs)
    @ApiModelProperty({
        type: Tag,
        isArray: true,
        minProperties: 1
    })
    tags: Tag[];

    @ManyToMany(type => Log, log => log.runs)
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
        isArray: true,
        minProperties: 1
    })
    logs: Log[];

    @OneToMany(type => EpnRoleSession, epnRoleSession => epnRoleSession.run)
    epnRoleSessions: EpnRoleSession[];

    @OneToMany(type => FlpRole, flpRole => flpRole.run)
    @ApiModelProperty({
        type: FlpRole,
        isArray: true
    })
    flpRoles: FlpRole[];

    @OneToMany(type => DetectorsInRun, detectorsInRun => detectorsInRun.run)
    detectorsInRun: DetectorsInRun[];

    @OneToMany(type => DetectorQualityHistory, detectorQualityHistory => detectorQualityHistory.run)
    detectorQualityHistories: DetectorQualityHistory[];

    @OneToMany(type => RunQualityHistory, runQualityHistory => runQualityHistory.run)
    runQualityHistories: RunQualityHistory[];

    @OneToMany(type => RunEorHistory, runEorHistory => runEorHistory.run)
    runEorHistories: RunEorHistory[];

    constructor(data: Run | {} = {}) {
        Object.assign(this, data);
    }
}
