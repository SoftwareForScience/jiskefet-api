import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('ReportPreference')
export class ReportPreference {

    @ManyToOne(type => User, user => user.reportPreference)
    @PrimaryColumn()
    user: User;

    @Column({ type: 'varchar' })
    report_stuff_etc: string;
}