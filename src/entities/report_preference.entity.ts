/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('report_preference')
export class ReportPreference {

    @ManyToOne(
        type => User,
        user => user.reportPreferences,
        {
            primary: true
        }
    )
    @JoinColumn({ name: 'fk_user_id' })
    user: User;

    @Column({ name: 'report_stuff_etc' })
    reportStuffEtc: string;
}
