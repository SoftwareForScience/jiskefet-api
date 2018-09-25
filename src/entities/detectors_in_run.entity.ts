import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('DetectorsInRun')
export class DetectorsInRun {

    @PrimaryColumn({ type: 'int' })
    fk_run_number: number;

    @PrimaryColumn({ type: 'int' })
    fk_detector_id: number;
    
    @Column({ type: 'enum' })
    run_quality: Enumerator;
}