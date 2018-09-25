import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('UsersNotifications')
export class UsersNotifications {

    @ManyToOne(type => Users, user => user.usersNotifications, {
        eager: true,
    })
    @JoinColumn({name: 'user_id'})
    user: Users;

    @Column({ type: 'boolean' })
    notify_sor: boolean;

    @Column({ type: 'boolean' })
    notify_eor: boolean;

    @Column({ type: 'boolean' })
    notify_subsystem: boolean;
}