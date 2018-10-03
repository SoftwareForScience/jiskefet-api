import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_notification')
export class UserNotification {

    @ManyToOne(
        type => User,
        user => user.userNotifications,
        {
            primary: true,
            nullable: false,
            eager: true
        }
    )
    @JoinColumn({ name: 'fk_user_id' })
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
