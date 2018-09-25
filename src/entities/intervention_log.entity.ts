import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('InterventionLogs')
export class InterventionLogs {

    @PrimaryColumn()
    fk_log_id: number;

    @Column({type: 'timestamp'})
    time_of_call: string;

    @PrimaryColumn({type: 'enum'})
    intervention_type: Enumerator;

    @Column({type: 'enum'})
    location: Enumerator;

    @Column()
    action_taken: string;
}
