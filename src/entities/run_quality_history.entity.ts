import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Run } from './run.entity';

@Entity('run_quality_history')
export class RunQualityHistory {

    @PrimaryGeneratedColumn({
        name: 'run_quality_history_id',
        type: 'bigint'
    })
    runQualityHistoryId: number;

    @ManyToOne(type => Run, run => run.runQualityHistory)
    @PrimaryColumn({ type: 'int' })
    run: Run;

    @Column({
        type: 'enum',
        enum: ['test'],
    })
    subsystem: 'test';

    @Column({
        name: 'fk_changed_by_user_id',
        type: 'int'
    })
    fkChangedByUserId: number;

    @Column({
        name: 'change_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    changeTime: Date;

    @Column({
        name: 'end_of_run_season',
        type: 'enum',
        enum: ['test'],
    })
    endOfRunSeason: 'test';

    @ManyToOne(type => User, user => user.runQualityHistory)
    user: User;
}
