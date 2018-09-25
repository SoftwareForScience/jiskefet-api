import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from 'typeorm';
import { Log } from './log.entity';
import { UserNotification } from './user_notification.entity';
import { ReportPreference } from './report_preference.entity';
import { UserFilter } from './user_filter.entity';
import { RunEorHistory } from './run_eor_history.entity';
import { SubSystemPermission } from './sub_system_permission.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    user_id: number;

    @Column({ type: 'int' })
    sams_id: number;

    @Column({ type: 'varchar' })
    token: string;

    @Column({ type: 'timestamp' })
    token_valid_until: Timestamp;

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
}