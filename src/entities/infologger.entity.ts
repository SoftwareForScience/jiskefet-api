/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages', { database: 'INFOLOGGER' })
export class InfoLogger {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({
        name: 'severity',
        nullable: true
    })
    severity: string;

    @Column({
        name: 'level',
        nullable: true,
        unsigned: true
    })
    level: number;

    @Column({
        name: 'timestamp',
        nullable: true,
        unsigned: true
    })
    timestamp: number;

    @Column({
        name: 'hostname',
        nullable: true
    })
    hostname: string;

    @Column({
        name: 'rolename',
        nullable: true
    })
    rolename: string;

    @Column({
        name: 'pid',
        nullable: true,
        unsigned: true
    })
    pid: number;

    @Column({
        name: 'username',
        nullable: true
    })
    username: string;

    @Column({
        name: 'system',
        nullable: true
    })
    system: string;

    @Column({
        name: 'facility',
        nullable: true
    })
    facility: string;

    @Column({
        name: 'detector',
        nullable: true
    })
    detector: string;

    @Column({
        name: 'partition',
        nullable: true
    })
    partition: string;

    @Column({
        name: 'run',
        nullable: true,
        unsigned: true
    })
    run: number;

    @Column({
        name: 'errcode',
        nullable: true,
        unsigned: true
    })
    errcode: number;

    @Column({
        name: 'errline',
        nullable: true,
        unsigned: true
    })
    errline: number;

    @Column({
        name: 'errsource',
        nullable: true
    })
    errsource: string;

    @Column({
        name: 'message',
        nullable: true,
    })
    message: string;
}
