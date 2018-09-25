import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Runs } from './runs.entity';

@Entity('EpnRoleSessions')
export class EpnRoleSessions {

    @PrimaryColumn({type: 'char', length: 16})
    epn_role_name: string;

    @ManyToOne(type => Runs, runs => runs.epnRoleSessions, {
        eager: true,
    })
    @JoinColumn({name: 'run_number'})
    runs: Runs;

    @PrimaryGeneratedColumn({type: 'bigint'})
    session_number: number;

    @Column()
    epn_hostname: string;

    @Column()
    n_subtimeframes: number;

    @Column()
    bytes_in: number;

    @Column()
    bytes_out: number;

    @Column({type: 'timestamp'})
    session_start: string;

    @Column({type: 'timestamp'})
    session_end: string;

}
