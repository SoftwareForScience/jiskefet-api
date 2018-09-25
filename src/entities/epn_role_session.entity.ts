import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Run } from './run.entity';

@Entity('EpnRoleSession')
export class EpnRoleSession {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    session_number: number;

    @PrimaryColumn({ type: 'char', length: 16 })
    epn_role_name: string;

    @ManyToOne(type => Run, run => run.epnRoleSession, {
        eager: true,
    })
    @JoinColumn({ name: 'run_number' })
    @PrimaryColumn({ type: 'bigint' })
    run: Run;

    @Column()
    epn_hostname: string;

    @Column()
    n_subtimeframes: number;

    @Column()
    bytes_in: number;

    @Column()
    bytes_out: number;

    @Column({ type: 'timestamp' })
    session_start: string;

    @Column({ type: 'timestamp' })
    session_end: string;

}
