import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Run } from './run.entity';

@Entity('run_quality_history')
export class RunQualityHistory {

    @PrimaryGeneratedColumn({ name: 'run_quality_history_id' })
    runQualityHistoryId: number;

    @ManyToOne(
        type => Run,
        run => run.runQualityHistories,
        {
            primary: true
        }
    )
    @JoinColumn({ name: 'fk_run_number' })
    run: Run;

    @ManyToOne(
        type => User,
        user => user.runQualityHistories,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'fk_changed_by_user_id' })
    user: User;

    @Column({
        name: 'change_time',
    })
    changeTime: Date;

    @Column({
        type: 'enum',
        enum: ['test'],
    })
    runQuality: 'test';
}
