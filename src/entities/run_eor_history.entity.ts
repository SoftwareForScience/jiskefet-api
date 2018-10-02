import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Run } from './run.entity';

@Entity('run_eor_history')
export class RunEorHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    eor_history_id: number;

    @ManyToOne(type => Run, run => run.runQualityHistory)
    @PrimaryColumn({ type: 'int' })
    run: Run;

    @PrimaryColumn({
        type: 'enum',
        enum: ['test'],
    })
    subsystem: 'test';

    @ManyToOne(type => User, user => user.runEorHistory)
    user: User;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    change_time: Date;

    @Column({
        type: 'enum',
        enum: ['test'],
    })
    end_of_run_reason: 'test';
}