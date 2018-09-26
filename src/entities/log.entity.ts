import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Tag } from './tag.entity';
import { Attachment } from './attachment.entity';
import { User } from './user.entity';

@Entity('logs')
export class Log {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    log_id: number;

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

    @Column({ type: 'timestamp' })
    creation_time: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    subsystem_fk_subsystem_id: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    announcement_valid_until: Date;

    @Column()
    comment_fk_parent_log_id: number;

    @Column()
    comment_fk_root_log_id: number;

    @ManyToMany(type => Tag)
    @JoinTable()
    tag: Tag[];

    @OneToMany(type => Attachment, attachment => attachment.log)
    attachment: Attachment[];
}
