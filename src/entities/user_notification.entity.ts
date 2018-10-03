import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('user_notifications')
export class UserNotification {

    @ManyToOne(type => User, user => user.userNotifications, {
        eager: true,
    })
    @PrimaryColumn({ type: 'bigint' })
    user: User;

    @Column({
        name: 'notify_sor',
        type: 'tinyint'
    })
    notifySor: boolean;

    @Column({
        name: 'notify_eor',
        type: 'tinyint'
    })
    notifyEor: boolean;

    @Column({
        name: 'notify_subsystem',
        type: 'tinyint'
    })
    notifySubsystem: boolean;
}
