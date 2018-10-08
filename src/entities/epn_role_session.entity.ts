import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Run } from './run.entity';

@Entity('epn_role_session')
export class EpnRoleSession {

    @PrimaryGeneratedColumn({ name: 'session_number' })
    sessionNumber: number;

    @PrimaryColumn({
        name: 'epn_role_name',
        type: 'char',
        length: 16
    })
    epnRoleName: string;

    @ManyToOne(
        type => Run, run => run.epnRoleSessions,
        {
            primary: true,
            eager: true
        }
    )
    @JoinColumn({ name: 'fk_run_number' })
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
    })
    sessionStart: Date;

    @Column({
        name: 'session_end',
    })
    sessionEnd: Date;
}
