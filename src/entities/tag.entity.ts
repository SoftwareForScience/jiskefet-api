/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('tag')
export class Tag {

    @PrimaryGeneratedColumn({ name: 'tag_id' })
    @ApiModelProperty({
        type: 'integer',
        format: 'int64',
    })
    tagId: number;

    @Column({ name: 'tag_text' })
    tagText: string;
}
