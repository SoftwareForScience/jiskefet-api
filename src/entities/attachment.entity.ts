/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Log } from './log.entity';

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
    creationTime: Date;

    @Column()
    title: string;

    @Column({ name: 'file_mime' })
    fileMime: string;

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
