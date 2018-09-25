import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Timestamp } from 'typeorm';

@Entity('RunEorHistory')
export class RunEorHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    eor_history_id: number;

    @PrimaryColumn({ type: 'int' })
    fk_run_number: number;

    @PrimaryColumn({ type: 'enum' })
    subsystem: Enumerator;

    @Column({ type: 'int' })
    fk_changed_by_user_id: number;

    @Column({ type: 'timestamp' })
    change_time: Timestamp;

    @Column({ type: 'enum' })
    end_of_run_reason: Enumerator;
}