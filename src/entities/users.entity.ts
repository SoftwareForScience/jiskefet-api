import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from 'typeorm';
import { Logs } from './logs.entity';
import { UsersNotifications } from './user_notifications.entity';
import { ReportPreferences } from './report_preferences.entity';
import { UserFilters } from './user_filters.entity';
import { RunEorHistory } from './run_eor_history.entity';
import { SubSystemPermissions } from './sub_system_permissions.entity';

@Entity('Users')
export class Users {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    user_id: number;

    @Column({ type: 'int' })
    sams_id: number;

    @Column({ type: 'varchar' })
    token: string;

    @Column({ type: 'timestamp' })
    token_valid_until: Timestamp;

    @OneToMany(type => Logs, logs => logs.user)
    logs: Logs[];

    @OneToMany(type => UsersNotifications, usersNotifications => usersNotifications.user)
    usersNotifications: UsersNotifications[];

    @OneToMany(type => ReportPreferences, reportPreferences => reportPreferences.user)
    reportPreferences: ReportPreferences[];

    @OneToMany(type => UserFilters, userFilters => userFilters.user)
    userFilters: UserFilters[];

    @OneToMany(type => RunEorHistory, runEorHistory => runEorHistory.user)
    runEorHistory: RunEorHistory[];

    @OneToMany(type => SubSystemPermissions, subSystemPermissions => subSystemPermissions.users)
    subSystemPermissions: SubSystemPermissions[];
}