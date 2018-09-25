import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Log } from './log.entity';

@Entity('Attachment')
export class Attachment {

    @PrimaryGeneratedColumn({type: 'bigint'})
    file_id: number;

    @ManyToOne(type => Log, log => log.attachment)
    log: Log;

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