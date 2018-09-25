import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Logs')
export class Logs {

    @PrimaryGeneratedColumn({type: 'bigint'})
    log_id: number;

    @Column({type: 'enum'})
    subtype: Enumerator;

    @Column()
    fk_user_id: number;

    @Column({type: 'enum'})
    origin: Enumerator;

    @Column({type: "timestamp"})
    creation_time: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    subsystem_fk_subsystem_id: number;

    @Column({type: 'timestamp'})
    announcement_valid_until: string;
    
    @Column()
    comment_fk_parent_log_id: number;

    @Column()
    comment_fk_root_log_id: number;
}
