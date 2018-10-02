import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('report_preferences')
export class ReportPreference {

    @ManyToOne(type => User, user => user.reportPreference)
    @PrimaryColumn({ type: 'bigint' })
    user: User;

    @Column({ name: 'report_stuff_etc' })
    reportStuffEtc: string;
}
