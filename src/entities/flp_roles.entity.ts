import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Runs } from './runs.entity';

@Entity('FlpRoles')
export class FlpRoles {

    @PrimaryColumn({type: 'char', length: 16})
    flp_role_name: string;

    @ManyToOne(type => Runs, runs => runs.flpRoles, {
        eager: true,
    })
    @JoinColumn({name: 'run_number'})
    runs: Runs;

    @Column()
    flp_hostname: string;

    @Column()
    n_timeframes: number;

    @Column()
    bytes_processed: number;
}
