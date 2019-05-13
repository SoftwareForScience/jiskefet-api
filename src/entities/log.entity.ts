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
import { ThreadDto } from '../dtos/thread.dto';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('log')
export class Log {

    @PrimaryGeneratedColumn({ name: 'log_id' })
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
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
    @ApiModelProperty()
    origin: 'human' | 'process';

    @Column({
        name: 'creation_time',
        precision: 0,
    })
    @ApiModelProperty({
        type: 'string',
        format: 'date-time'
    })
    creationTime: Date;

    @Column()
    @ApiModelProperty()
    title: string;

    @Column({ type: 'longtext' })
    @ApiModelProperty()
    body: string;

    @Column({
        name: 'subsystem_fk_subsystem_id',
        nullable: true,
    })
    @ApiModelProperty({
        required: false,
        type: 'integer',
        format: 'int64',
    })
    subsystemFkSubsystemId: number;

    @Column({
        name: 'announcement_valid_until',
        precision: 0,
        nullable: true,
    })
    @ApiModelProperty({
        required: false,
        type: 'string',
        format: 'date-time',
    })
    announcementValidUntil: Date;

    @Column({
        name: 'comment_fk_parent_log_id',
        nullable: true
    })
    @ApiModelProperty({
        required: false,
        type: 'integer',
        format: 'int64',
    })
    commentFkParentLogId: number;

    @Column({
        name: 'comment_fk_root_log_id',
        nullable: true
    })
    @ApiModelProperty({
        required: false,
        type: 'integer',
        format: 'int64',
    })
    commentFkRootLogId: number;

    @ManyToMany(type => Tag, tag => tag.logs)
    @ApiModelProperty({
        type: Tag,
        isArray: true,
        minProperties: 1
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
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    runs: Run[];

    @OneToMany(type => Attachment, attachment => attachment.log, {
        cascade: ['insert']
    })
    @ApiModelProperty({
        type: Attachment,
        required: false,
        isArray: true,
    })
    attachments: Attachment[];

    constructor(data: Log | {} = {}) {
        Object.assign(this, data);
    }

    /**
     * Method to convert Log to a ThreadDto
     */
    toThreadDto?(this: Log): ThreadDto {
        const thread = new ThreadDto();
        thread.logId = this.logId;
        thread.commentFkParentLogId = this.commentFkParentLogId;
        thread.commentFkRootLogId = this.commentFkRootLogId;
        thread.creationTime = this.creationTime;
        thread.body = this.body;
        thread.title = this.title;
        thread.user = this.user;
        return thread;
    }
}
