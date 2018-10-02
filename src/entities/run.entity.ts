import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Tag } from './tag.entity';
import { Log } from './log.entity';
import { EpnRoleSession } from './epn_role_session.entity';
import { FlpRole } from './flp_role.entity';
import { DetectorsInRun } from './detector_in_run.entity';
import { DetectorQualityHistory } from './detector_quality_history.entity';
import { RunQualityHistory } from './run_quality_history.entity';
import { RunEorHistory } from './run_eor_history.entity';

@Entity('runs')
export class Run {

    @PrimaryGeneratedColumn()
    run_number: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    time_o2_start: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    time_trg_start: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    time_trg_end: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    time_o2_end: Date;

    @Column({ type: 'char', length: 64 })
    activity_id: string;

    @Column({
        type: 'enum',
        enum: ['test'],
    })
    run_type: ['test'];

    @Column({
        type: 'enum',
        enum: ['test'],
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

    @OneToMany(type => DetectorQualityHistory, detectorQualityHistory => detectorQualityHistory.run)
    detectorQualityHistory: DetectorQualityHistory[];

    @OneToMany(type => RunQualityHistory, runQualityHistory => runQualityHistory.run)
    runQualityHistory: RunQualityHistory[];

    @OneToMany(type => RunEorHistory, runEorHistory => runEorHistory.run)
    runEorHistory: RunEorHistory[];
}
