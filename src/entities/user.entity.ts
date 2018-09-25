import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { TimeLog } from './timelog.entity';
import { Role } from './role.entity';
import { UserActivity } from './user_activity.entity';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: false,
    })
    name: string;

    @Column({
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        nullable: false,
    })
    password_hash: string;

    // Check to see if we save the date in UNIX timestamp or in DATE TIME
    @Column()
    last_login_date: number;

    @Column()
    account_creation_date: number;

    @OneToMany(type => TimeLog, timelog => timelog.user)
    timelogs: TimeLog;

    @OneToOne(type => Role)
    @JoinColumn()
    role: Role;

    @OneToMany(type => UserActivity, userActivity => userActivity.user)
    userActivities: UserActivity[];

    constructor(data: User | {} = {}) {
        Object.assign(this, data);
        if (!this.last_login_date) {
            // Gets UNIX timestamp in seconds
            this.last_login_date = Math.round(+new Date() / 1000);
        }
    }
}