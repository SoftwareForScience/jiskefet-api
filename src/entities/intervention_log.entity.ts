import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Log } from './log.entity';

@Entity('intervention_logs')
export class InterventionLog {

    @OneToOne(type => Log, {
        eager: true,
    })
    @JoinColumn({ name: 'log_id' })
    @PrimaryColumn({ type: 'bigint' })
    log: Log;

    @Column({
        name: 'time_of_call',
        type: 'timestamp',
        nullable: true
    })
    timeOfCall: string;

    @Column({
        name: 'intervention_type',
        type: 'enum',
        enum: ['test'],
        nullable: true
    })
    interventionType: 'test';

    @Column({
        type: 'enum',
        enum: ['test'],
        nullable: true
    })
    location: 'test';

    @Column({
        name: 'action_taken',
        nullable: true
    })
    actionTaken: string;
}
