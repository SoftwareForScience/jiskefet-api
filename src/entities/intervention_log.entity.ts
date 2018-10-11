/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Log } from './log.entity';

@Entity('intervention_log')
export class InterventionLog {

    @OneToOne(
        type => Log,
        {
            primary: true,
            eager: true,
        }
    )
    @JoinColumn({ name: 'log_id' })
    log: Log;

    @Column({
        name: 'time_of_call',
        precision: 0,
        nullable: true
    })
    timeOfCall: Date;

    @Column({
        name: 'intervention_type',
        type: 'enum',
        enum: ['test'],
        nullable: true
    })
    interventionType: 'test';

    @Column({
        type: 'enum',
        enum: ['test'],
        nullable: true
    })
    location: 'test';

    @Column({
        name: 'action_taken',
        nullable: true
    })
    actionTaken: string;
}
