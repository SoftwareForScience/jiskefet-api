import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserActivity } from './user_activity.entity';

@Entity('activity')
export class Activity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacher: string;

    @Column()
    status: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    hours: number;

    @Column()
    major: string;

    @Column()
    date: string;

    @OneToMany(type => UserActivity, userActivity => userActivity.user)
    userActivities: UserActivity[];
}