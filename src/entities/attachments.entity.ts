import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Logs } from './logs.entity';

@Entity('Attachments')
export class Attachments {

    @PrimaryGeneratedColumn({type: 'bigint'})
    file_id: number;

    @ManyToOne(type => Logs, logs => logs.attachments)
    logs: Logs;

    @Column({type: 'timestamp'})
    creation_time: string;

    @Column()
    title: string;

    @Column()
    file_mime: string;

    @Column({type: 'blob'})
    file_data: number;

    @Column({type: 'char', length: 16})
    file_md5: string;
}