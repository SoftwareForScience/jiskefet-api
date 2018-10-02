import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Run } from './run.entity';

@Entity('epn_role_sessions')
export class EpnRoleSession {

    @PrimaryGeneratedColumn({
        name: 'session_number',
        type: 'bigint'
    })
    sessionNumber: number;

    @PrimaryColumn({
        name: 'epn_role_name',
        type: 'char',
        length: 16
    })
    epnRoleName: string;

    @ManyToOne(type => Run, run => run.epnRoleSession, {
        eager: true,
    })
    @JoinColumn({ name: 'run_number' })
    @PrimaryColumn({ type: 'bigint' })
    run: Run;

    @Column({ name: 'epn_hostname' })
    epnHostname: string;

    @Column({ name: 'n_subtimeframes' })
    nSubtimeframes: number;

    @Column({ name: 'bytes_in' })
    bytesIn: number;

    @Column({ name: 'bytes_out' })
    bytesOut: number;

    @Column({
        name: 'session_start',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    sessionStart: string;

    @Column({
        name: 'session_end',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    sessionEnd: string;
}
