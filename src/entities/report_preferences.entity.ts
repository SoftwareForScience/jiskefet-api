import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('ReportPreferences')
export class ReportPreferences {

    @PrimaryColumn({ type: 'int' })
    fk_user_id: number;

    @Column({ type: 'varchar' })
    report_stuff_etc: string;
}