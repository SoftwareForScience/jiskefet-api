/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Run } from './run.entity';

@Entity('epn_role_session')
export class EpnRoleSession {

    @PrimaryGeneratedColumn({ name: 'session_number' })
    sessionNumber: number;

    @PrimaryColumn({
        name: 'epn_role_name',
        type: 'char',
        length: 16
    })
    epnRoleName: string;

    @ManyToOne(
        type => Run, run => run.epnRoleSessions,
        {
            primary: true,
            eager: true
        }
    )
    @JoinColumn({ name: 'fk_run_number' })
    run: Run;

    @Column({ name: 'epn_hostname' })
    epnHostname: string;

    @Column({ name: 'n_subtimeframes' })
    nSubtimeframes: number;

    @Column({ name: 'bytes_in' })
    bytesIn: number;

    @Column({ name: 'bytes_out' })
    bytesOut: number;

    @Column({
        name: 'session_start',
        precision: 0,
    })
    sessionStart: Date;

    @Column({
        name: 'session_end',
        precision: 0,
    })
    sessionEnd: Date;
}
