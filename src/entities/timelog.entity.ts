import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { User } from './user.entity';

@Entity('time_log')
export class TimeLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start_datetime: Date;

    @Column()
    end_datetime: Date;

    @Column()
    hours: number;

    @ManyToOne(type => User, user => user.timelogs)
    user: User;

    // todo: add relationship to activity
    activity: any;

    @Column()
    description: string;
}