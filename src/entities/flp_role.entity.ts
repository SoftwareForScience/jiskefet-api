import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Run } from './run.entity';

@Entity('FlpRole')
export class FlpRole {

    @PrimaryColumn({ type: 'char', length: 16 })
    flp_role_name: string;

    @ManyToOne(type => Run, run => run.flpRole, {
        eager: true,
    })
    @PrimaryColumn({ type: 'bigint' })
    @JoinColumn({ name: 'run_number' })
    run: Run;

    @Column()
    flp_hostname: string;

    @Column()
    n_timeframes: number;

    @Column()
    bytes_processed: number;
}
