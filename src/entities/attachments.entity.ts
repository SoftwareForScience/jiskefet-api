import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Attachments')
export class Attachments {

    @PrimaryGeneratedColumn({type: 'bigint'})
    file_id: number;

    @Column()
    fk_log_id: number;

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
