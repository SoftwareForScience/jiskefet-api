import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Log } from './log.entity';

@Entity('intervention_log')
export class InterventionLog {

    @OneToOne(
        type => Log,
        {
            primary: true,
            eager: true,
        }
    )
    @JoinColumn({ name: 'log_id' })
    log: Log;

    @Column({
        name: 'time_of_call',
        precision: 0,
        nullable: true
    })
    timeOfCall: Date = new Date();

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
