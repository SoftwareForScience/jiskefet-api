import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Timestamp, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('run_eor_history')
export class RunEorHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    eor_history_id: number;

    @PrimaryColumn({ type: 'int' })
    fk_run_number: number;

    @PrimaryColumn({
        type: 'enum',
        enum: ['test']
    })
    subsystem: 'test';

    @ManyToOne(type => User, user => user.runEorHistory)
    user: User;

    @Column({ type: 'timestamp' })
    change_time: Timestamp;

    @Column({
        type: 'enum',
        enum: ['test']
    })
    end_of_run_reason: 'test';
}