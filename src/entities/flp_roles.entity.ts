import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('FlpRoles')
export class FlpRoles {

    @PrimaryColumn({type: 'char', length: 16})
    flp_role_name: string;

    @PrimaryColumn()
    fk_run_number: number;

    @Column()
    flp_hostname: string;

    @Column()
    n_timeframes: number;

    @Column()
    bytes_processed: number;
}
