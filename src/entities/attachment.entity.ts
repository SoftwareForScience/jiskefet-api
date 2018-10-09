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
            nullable: false
        }
    )
    @JoinColumn({ name: 'fk_log_id'})
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
