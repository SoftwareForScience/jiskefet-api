/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Log } from './log.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('attachment')
export class Attachment {
    @PrimaryGeneratedColumn({ name: 'file_id' })
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    fileId: number;

    @ManyToOne(
        type => Log,
        log => log.attachments,
        {
            nullable: true,
            cascade: ['insert'],

        },
    )
    @JoinColumn({ name: 'fk_log_id' })
    @ApiModelProperty()
    log: Log;

    @Column({
        name: 'creation_time',
        precision: 0,
    })
    @ApiModelProperty({
        type: 'string',
        format: 'date-time',
    })
    creationTime: Date;

    @Column({ nullable: true })
    @ApiModelProperty()
    title: string;

    @Column({ name: 'file_name' })
    @ApiModelProperty()
    fileName: string;

    @Column({ name: 'file_mime' })
    @ApiModelProperty()
    fileMime: string;

    @Column({
        name: 'file_data',
        type: 'longblob',
    })
    @ApiModelProperty()
    fileData: string;
}
