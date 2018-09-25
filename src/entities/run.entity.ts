import { Timestamp, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Tag } from './tag.entity';
import { Log } from './log.entity';
import { EpnRoleSession } from './epn_role_session.entity';
import { FlpRole } from './flp_role.entity';
import { DetectorsInRun } from './detectors_in_run.entity';

@Entity('Run')
export class Run {

    @PrimaryGeneratedColumn()
    run_number: number;

    @Column({
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    time_o2_start: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    time_trg_start: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    time_trg_end: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    time_o2_end: Date;

    @Column({ type: 'char', length: 64 })
    activity_id: string;

    @Column({
        type: 'enum',
        enum: ['test'],
        nullable: true
    })
    run_type: ['test'];

    @Column({
        type: 'enum',
        enum: ['test'],
        nullable: true
    })
    run_quality: ['test'];

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

    @ManyToMany(type => Tag)
    @JoinTable()
    tag: Tag[];

    @ManyToMany(type => Log)
    @JoinTable()
    log: Log[];

    @OneToMany(type => EpnRoleSession, epnRoleSession => epnRoleSession.run)
    epnRoleSession: EpnRoleSession[];

    @OneToMany(type => FlpRole, flpRole => flpRole.run)
    flpRole: FlpRole[];

    @OneToMany(type => DetectorsInRun, detectorsInRun => detectorsInRun.run)
    detectorsInRun: DetectorsInRun[];
}
