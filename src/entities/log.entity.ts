/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Tag } from './tag.entity';
import { Attachment } from './attachment.entity';
import { User } from './user.entity';
import { Run } from './run.entity';

@Entity('log')
export class Log {

    @PrimaryGeneratedColumn({ name: 'log_id' })
    logId: number;

    @Column({
        type: 'enum',
        enum: ['run', 'subsystem', 'announcement', 'intervention', 'comment'],
    })
    subtype: 'run' | 'subsystem' | 'announcement' | 'intervention' | 'comment';

    @ManyToOne(
        type => User,
        user => user.logs,
        {
            nullable: false,
            cascade: ['insert']
        }
    )
    @JoinColumn({ name: 'fk_user_id' })
    user: User;

    @Column({
        type: 'enum',
        enum: ['human', 'process'],
    })
    origin: 'human' | 'process';

    @Column({
        name: 'creation_time',
        precision: 0,
    })
    creationTime: Date;

    @Column()
    title: string;

    @Column({ type: 'longtext' })
    text: string;

    @Column({
        name: 'subsystem_fk_subsystem_id',
        nullable: true,
    })
    subsystemFkSubsystemId: number;

    @Column({
        name: 'announcement_valid_until',
        precision: 0,
        nullable: true,
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
    @JoinTable({
        name: 'tags_in_log',
        joinColumn: {
            name: 'fk_log_id',
            referencedColumnName: 'logId'
        },
        inverseJoinColumn: {
            name: 'fk_tag_id',
            referencedColumnName: 'tagId'
        }
    })
    tags: Tag[];

    @ManyToMany(
        type => Run,
        run => run.logs
    )
    @JoinTable({
        name: 'runs_in_log',
        joinColumn: {
            name: 'fk_log_id',
            referencedColumnName: 'logId'
        },
        inverseJoinColumn: {
            name: 'fk_run_number',
            referencedColumnName: 'runNumber'
        }
    })
    runs: Run[];

    @OneToMany(type => Attachment, attachment => attachment.log, {
        cascade: ['insert']
    })
    attachments: Attachment[];

    constructor(data: Log | {} = {}) {
        Object.assign(this, data);
    }
}
