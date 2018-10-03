import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Run } from './run.entity';

@Entity('flp_roles')
export class FlpRole {

    @PrimaryColumn({
        name: 'flp_role_name',
        type: 'char',
        length: 16
    })
    flpRoleName: string;

    @ManyToOne(type => Run, run => run.flpRoles, {
        eager: true,
    })
    @PrimaryColumn({ type: 'bigint' })
    @JoinColumn({ name: 'run_number' })
    run: Run;

    @Column({ name: 'flp_hostname' })
    flpHostname: string;

    @Column({ name: 'n_timeframes' })
    nTimeframes: number;

    @Column({ name: 'bytes_processed' })
    bytesProcessed: number;
}
