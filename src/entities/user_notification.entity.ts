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

    @Column({ type: 'tinyint' })
    notify_sor: boolean;

    @Column({ type: 'tinyint' })
    notify_eor: boolean;

    @Column({ type: 'tinyint' })
    notify_subsystem: boolean;
}