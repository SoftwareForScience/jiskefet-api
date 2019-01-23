/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Log } from './log.entity';
import { UserNotification } from './user_notification.entity';
import { ReportPreference } from './report_preference.entity';
import { UserFilter } from './user_filter.entity';
import { RunEorHistory } from './run_eor_history.entity';
import { SubSystemPermission } from './sub_system_permission.entity';
import { RunQualityHistory } from './run_quality_history.entity';
import { DetectorQualityHistory } from './detector_quality_history.entity';
import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column({
        name: 'external_id',
        type: 'int',
        unique: true
    })
    externalUserId: number;

    @Column({
        name: 'sams_id',
        type: 'int'
    })
    samsId: number;

    @OneToMany(type => Log, log => log.user)
    logs: Log[];

    @OneToMany(type => UserNotification, userNotification => userNotification.user)
    userNotifications: UserNotification[];

    @OneToMany(type => ReportPreference, reportPreference => reportPreference.user)
    reportPreferences: ReportPreference[];

    @OneToMany(type => UserFilter, userFilter => userFilter.user)
    userFilters: UserFilter[];

    @OneToMany(type => RunEorHistory, runEorHistory => runEorHistory.user)
    runEorHistories: RunEorHistory[];

    @OneToMany(type => SubSystemPermission, subSystemPermissions => subSystemPermissions.user)
    subSystemPermissions: SubSystemPermission[];

    @OneToMany(type => RunQualityHistory, runQualityHistory => runQualityHistory.user)
    runQualityHistories: RunQualityHistory[];

    @OneToMany(type => DetectorQualityHistory, detectorQualityHistory => detectorQualityHistory.user)
    detectorQualityHistories: DetectorQualityHistory[];

    constructor(data: User | {} = {}) {
        Object.assign(this, data);
    }
}
