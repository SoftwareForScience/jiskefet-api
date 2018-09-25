import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity('ReportPreferences')
export class ReportPreferences {

    @ManyToOne(type => Users, user => user.reportPreferences)
    user: Users;

    @Column({ type: 'varchar' })
    report_stuff_etc: string;
}