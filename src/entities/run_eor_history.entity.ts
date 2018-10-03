import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Run } from './run.entity';

@Entity('run_eor_history')
export class RunEorHistory {

    @PrimaryGeneratedColumn({
        name: 'eor_history_id',
        type: 'bigint'
    })
    eorHistoryId: number;

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
        name: 'change_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    changeTime: Date;

    @Column({
        name: 'end_of_run_reason',
        type: 'enum',
        enum: ['test'],
    })
    endOfRunReason: 'test';
}
