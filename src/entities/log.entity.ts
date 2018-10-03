import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Tag } from './tag.entity';
import { Attachment } from './attachment.entity';
import { User } from './user.entity';

@Entity('logs')
export class Log {

    @PrimaryGeneratedColumn({
        name: 'log_id',
        type: 'bigint'
    })
    logId: number;

    @Column({
        type: 'enum',
        enum: ['run', 'subsystem', 'announcement', 'intervention', 'comment'],
    })
    subtype: 'run' | 'subsystem' | 'announcement' | 'intervention' | 'comment';

    @ManyToOne(type => User, user => user.log)
    user: User;

    @Column({
        type: 'enum',
        enum: ['human', 'process'],
    })
    origin: 'human' | 'process';

    @Column({
        name: 'creation_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationTime: Date;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({
        name: 'subsystem_fk_subsystem_id',
        nullable: true,
    })
    subsystemFkSubsystemId: number;

    @Column({
        name: 'announcement_valid_until',
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    })
    announcementValidUntil: Date;

    @Column({
        name: 'comment_fk_parent_log_id',
        nullable: true
    })
    commentFkParentLogId: number;

    @Column({
        name: 'comment_fk_root_log_id',
        nullable: true
    })
    commentFkRootLogId: number;

    @ManyToMany(type => Tag)
    @JoinTable()
    tag: Tag[];

    @OneToMany(type => Attachment, attachment => attachment.log)
    attachment: Attachment[];
}
