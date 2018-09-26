import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    tag_id: number;

    @Column({ type: 'varchar' })
    tag_text: string;
}
