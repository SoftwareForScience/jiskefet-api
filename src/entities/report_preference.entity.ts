import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('report_preference')
export class ReportPreference {

    @ManyToOne(
        type => User,
        user => user.reportPreferences,
        {
            primary: true
        }
    )
    @JoinColumn({ name: 'fk_user_id' })
    user: User;

    @Column({ name: 'report_stuff_etc' })
    reportStuffEtc: string;
}
