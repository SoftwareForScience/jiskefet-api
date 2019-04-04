/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Run } from './run.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('flp_role')
export class FlpRole {

    @PrimaryColumn({
        name: 'flp_name',
        type: 'char',
        length: 16
    })
    flpName: string;

    @ManyToOne(
        type => Run, run => run.flpRoles,
        {
            primary: true,
            eager: true
        }
    )
    @JoinColumn({ name: 'fk_run_number' })
    @ApiModelProperty({
        type: Run
    })
    run: Run;

    @Column({
        name: 'flp_hostname'
    })
    flpHostname: string;

    @Column({
        name: 'n_sub_timeframes',
        nullable: true
    })
    nSubTimeframes: number;

    @Column({
        name: 'equipment_bytes',
        nullable: true
    })
    equipmentBytes: number;

    @Column({
        name: 'recording_bytes',
        nullable: true
    })
    recordingBytes: number;

    @Column({
        name: 'fair_mq_bytes',
        nullable: true
    })
    fairMQBytes: number;

    // Maybe there is use for it later.
    // @Column({ name: 'bytes_processed' })
    // bytesProcessed: number;
}
