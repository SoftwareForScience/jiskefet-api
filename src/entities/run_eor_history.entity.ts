import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Timestamp, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity('RunEorHistory')
export class RunEorHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    eor_history_id: number;

    @PrimaryColumn({ type: 'int' })
    fk_run_number: number;

    @PrimaryColumn({ type: 'enum' })
    subsystem: Enumerator;

    @ManyToOne(type => Users, user => user.runEorHistory)
    user: Users;

    @Column({ type: 'timestamp' })
    change_time: Timestamp;

    @Column({ type: 'enum' })
    end_of_run_reason: Enumerator;
}