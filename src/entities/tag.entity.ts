/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Run } from './run.entity';
import { Log } from './log.entity';

@Entity('tag')
export class Tag {

    @PrimaryGeneratedColumn({ name: 'tag_id' })
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    tagId: number;

    @Column({ name: 'tag_text' })
    @ApiModelProperty()
    tagText: string;

    @ManyToMany(type => Run, run => run.tags)
    @JoinTable({
        name: 'tags_in_run',
        joinColumn: {
            name: 'fk_tag_id',
            referencedColumnName: 'tagId'
        },
        inverseJoinColumn: {
            name: 'fk_run_number',
            referencedColumnName: 'runNumber'
        }
    })
    @ApiModelProperty({
        type: Run,
        // isArray: true,
        // minProperties: 1
    })
    runs: Run[];

    @ManyToMany(type => Log, log => log.tags)
    @JoinTable({
        name: 'tags_in_log',
        joinColumn: {
            name: 'fk_tag_id',
            referencedColumnName: 'tagId'
        },
        inverseJoinColumn: {
            name: 'fk_log_id',
            referencedColumnName: 'logId'
        }
    })
    @ApiModelProperty({
        type: Log,
        // isArray: true,
        // minProperties: 1
    })
    logs: Log[];
}
