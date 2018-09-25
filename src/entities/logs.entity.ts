import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Tags } from './tags.entity';
import { Attachments } from './attachments.entity';
import { Users } from './users.entity';

@Entity('Logs')
export class Logs {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    log_id: number;

    @Column({
        type: 'enum',
        enum: ['run', 'subsystem', 'announcement', 'intervention', 'comment'],
    })
    subtype: Enumerator;

    @ManyToOne(type => Users, user => user.logs)
    user: Users;

    @Column({
        type: 'enum',
        enum: ['human', 'process'],
    })
    origin: Enumerator;

    @Column({ type: 'timestamp' })
    creation_time: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    subsystem_fk_subsystem_id: number;

    @Column({ type: 'timestamp' })
    announcement_valid_until: string;

    @Column()
    comment_fk_parent_log_id: number;

    @Column()
    comment_fk_root_log_id: number;

    @ManyToMany(type => Tags)
    @JoinTable()
    tags: Tags[];

    @OneToMany(type => Attachments, attachments => attachments.logs)
    attachments: Attachments[];
}
