import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Log } from './log.entity';
import { UserNotification } from './user_notification.entity';
import { ReportPreference } from './report_preference.entity';
import { UserFilter } from './user_filter.entity';
import { RunEorHistory } from './run_eor_history.entity';
import { SubSystemPermission } from './sub_system_permission.entity';
import { RunQualityHistory } from './run_quality_history.entity';
import { DetectorQualityHistory } from './detector_quality_history.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn({
        name: 'user_id',
        type: 'bigint'
    })
    userId: number;

    @Column({
        name: 'sams_id',
        type: 'int'
    })
    samsId: number;

    @Column({ nullable: true })
    token: string;

    @Column({
        name: 'token_valid_until',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true
    })
    tokenValidUntil: Date;

    @OneToMany(type => Log, log => log.user)
    log: Log[];

    @OneToMany(type => UserNotification, userNotification => userNotification.user)
    userNotification: UserNotification[];

    @OneToMany(type => ReportPreference, reportPreference => reportPreference.user)
    reportPreference: ReportPreference[];

    @OneToMany(type => UserFilter, userFilter => userFilter.user)
    userFilter: UserFilter[];

    @OneToMany(type => RunEorHistory, runEorHistory => runEorHistory.user)
    runEorHistory: RunEorHistory[];

    @OneToMany(type => SubSystemPermission, subSystemPermissions => subSystemPermissions.user)
    subSystemPermission: SubSystemPermission[];

    @OneToMany(type => RunQualityHistory, runQualityHistory => runQualityHistory.user)
    runQualityHistory: RunQualityHistory[];

    @OneToMany(type => DetectorQualityHistory, detectorQualityHistory => detectorQualityHistory.user)
    detectorQualityHistory: DetectorQualityHistory[];
}
