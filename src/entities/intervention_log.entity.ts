import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Logs } from './logs.entity';

@Entity('InterventionLogs')
export class InterventionLogs {

    @OneToOne(type => Logs, {
        eager: true,
    })
    @JoinColumn({name: 'log_id'})
    logs: Logs;

    @Column({type: 'timestamp'})
    time_of_call: string;

    @PrimaryColumn({type: 'enum'})
    intervention_type: Enumerator;

    @Column({type: 'enum'})
    location: Enumerator;

    @Column()
    action_taken: string;
}
