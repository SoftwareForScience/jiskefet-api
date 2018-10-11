/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Run } from './run.entity';

@Entity('flp_role')
export class FlpRole {

    @PrimaryColumn({
        name: 'flp_role_name',
        type: 'char',
        length: 16
    })
    flpRoleName: string;

    @ManyToOne(
        type => Run, run => run.flpRoles,
        {
            primary: true,
            eager: true
        }
    )
    @JoinColumn({ name: 'fk_run_number' })
    run: Run;

    @Column({ name: 'flp_hostname' })
    flpHostname: string;

    @Column({ name: 'n_timeframes' })
    nTimeframes: number;

    @Column({ name: 'bytes_processed' })
    bytesProcessed: number;
}
