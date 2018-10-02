import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_notifications')
export class UserNotification {

    @ManyToOne(type => User, user => user.userNotification, {
        eager: true,
    })
    @PrimaryColumn({ type: 'bigint' })
    // @JoinColumn({name: 'user_id'})
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
