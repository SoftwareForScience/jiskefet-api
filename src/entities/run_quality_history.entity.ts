import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Run } from './run.entity';

@Entity('run_quality_history')
export class RunQualityHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    run_quality_history_id: number;

    @ManyToOne(type => Run, run => run.runQualityHistory)
    @PrimaryColumn({ type: 'int' })
    run: Run;

    @Column({
        type: 'enum',
        enum: ['test'],
    })
    subsystem: 'test';

    @Column({ type: 'int' })
    fk_changed_by_user_id: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    change_time: Date;

    @Column({
        type: 'enum',
        enum: ['test'],
    })
    end_of_run_season: 'test';

    @ManyToOne(type => User, user => user.runQualityHistory)
    user: User;
}