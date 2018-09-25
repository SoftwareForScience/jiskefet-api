import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('UsersNotifications')
export class UsersNotifications {

    @PrimaryColumn({ type: 'int' })
    fk_user_id: number;

    @Column({ type: 'boolean' })
    notify_sor: boolean;

    @Column({ type: 'boolean' })
    notify_eor: boolean;

    @Column({ type: 'boolean' })
    notify_subsystem: boolean;
}