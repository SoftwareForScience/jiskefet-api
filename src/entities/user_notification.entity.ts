import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('UserNotification')
export class UserNotification {

    @ManyToOne(type => User, user => user.userNotification, {
        eager: true,
    })
    @JoinColumn({name: 'user_id'})
    @PrimaryColumn()
    user: User;

    @Column({ type: 'boolean' })
    notify_sor: boolean;

    @Column({ type: 'boolean' })
    notify_eor: boolean;

    @Column({ type: 'boolean' })
    notify_subsystem: boolean;
}