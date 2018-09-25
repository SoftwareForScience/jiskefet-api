import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Runs')
export class Runs {

    @PrimaryGeneratedColumn()
    run_number: number;

    @Column()
    time_o2_start: Date;

    @Column({type: 'timestamp'})
    time_trg_start: string;

    @Column({type: 'timestamp'})
    time_trg_end: string;

    @Column({type: 'char', length: 64})
    activity_id: string;

    @Column({type: 'enum'})
    run_type: Enumerator;

    @Column({type: 'enum'})
    run_quality: Enumerator;

    @Column()
    n_detectors: number;

    @Column()
    n_flps: number;
    
    @Column()
    n_epns: number;

    @Column()
    n_timeframes: number;

    @Column()
    n_subtimeframes: number;

    @Column()
    bytes_read_out: number;

    @Column()
    bytes_timeframe_builder: number;
}
