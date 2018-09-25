import { User } from './user.entity';
import { Activity } from './activity.entity';
import { ManyToOne, Entity, Column, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class UserActivity {

    @PrimaryColumn()
    userId: number;

    @ManyToOne(type => User, user => user.userActivities, {
        // primary: true,
        eager: true,
    })
    @JoinColumn({ name: 'userId'})
    user: User;

    @PrimaryColumn()
    activityId: number;

    @ManyToOne(type => Activity, activity => activity.userActivities, {
        // primary: true,
        eager: true,
    })
    @JoinColumn({ name: 'activityId'})
    activity: Activity;

    @Column({ nullable: true })
    comment: string;
}