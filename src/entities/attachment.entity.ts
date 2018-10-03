import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Log } from './log.entity';

@Entity('attachments')
export class Attachment {

    @PrimaryGeneratedColumn({
        name: 'file_id',
        type: 'bigint'
    })
    fileId: number;

    @ManyToOne(type => Log, log => log.attachments)
    log: Log;

    @Column({
        name: 'creation_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationTime: Date;

    @Column()
    title: string;

    @Column({ name: 'file_mime' })
    fileMime: string;

    @Column({
        name: 'file_data',
        type: 'blob'
    })
    fileData: number;

    @Column({
        name: 'file_md5',
        type: 'char',
        length: 16,
        nullable: true
    })
    fileMD5: string;
}
