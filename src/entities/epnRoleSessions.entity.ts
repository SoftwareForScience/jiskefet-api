import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('EpnRoleSessions')
export class EpnRoleSessions {

    @PrimaryColumn({type: 'char', length: 16})
    epn_role_name: string;

    @PrimaryColumn()
    fk_run_number: number;

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
