import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Log } from './log.entity';

@Entity('InterventionLog')
export class InterventionLog {

    @OneToOne(type => Log, {
        eager: true,
    })
    @JoinColumn({ name: 'log_id' })
    @PrimaryColumn()
    log: Log;

    @Column({ type: 'timestamp' })
    time_of_call: string;

    @Column({
        type: 'enum',
        enum: ['test']
    })
    intervention_type: 'test';

    @Column({
        type: 'enum',
        enum: ['test']
    })
    location: 'test';

    @Column()
    action_taken: string;
}
