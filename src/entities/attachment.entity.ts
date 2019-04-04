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
    fileId: number;

    @ManyToOne(
        type => Log,
        log => log.attachments,
        {
            nullable: true,
            cascade: ['insert']

        }
    )
    @JoinColumn({ name: 'fk_log_id' })
    log: Log;

    @Column({
        name: 'creation_time',
        precision: 0,
    })
    @ApiModelProperty({
        type: 'string',
        format: 'date-time'
    })
    creationTime: Date;

    @Column({ nullable: true })
    title: string;

    @Column({ name: 'file_name' })
    fileName: string;

    @Column({ name: 'file_size' })
    fileSize: number;

    @Column({ name: 'file_mime' })
    fileMime: string;

    @Column({ name: 'content_type'})
    contentType: string;

    @Column({
        name: 'file_data',
        type: 'longblob'
    })
    fileData: string;

    @Column({
        name: 'file_md5',
        type: 'char',
        length: 16,
        nullable: true
    })
    fileMD5: string;
}
