/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Run } from './run.entity';

@Entity('run_eor_history')
export class RunEorHistory {

    @PrimaryGeneratedColumn({ name: 'eor_history_id' })
    eorHistoryId: number;

    @ManyToOne(
        type => Run,
        run => run.runQualityHistories,
        {
            primary: true
        }
    )
    @JoinColumn({ name: 'fk_run_number' })
    run: Run;

    @PrimaryColumn({
        type: 'enum',
        enum: ['test'],
    })
    subsystem: 'test';

    @ManyToOne(
        type => User,
        user => user.runEorHistories,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'fk_changed_by_user_id' })
    user: User;

    @Column({
        name: 'change_time',
        precision: 0,
    })
    changeTime: Date;

    @Column({
        name: 'end_of_run_reason',
        type: 'enum',
        enum: ['test'],
    })
    endOfRunReason: 'test';
}
