import { Entity, PrimaryColumn } from 'typeorm';

@Entity('RunsInLog')
export class RunsInLog {

    @PrimaryColumn()
    fk_log_id: number;

    @PrimaryColumn()
    fk_run_id: number;
}
