import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    tag_id: number;

    @Column()
    tag_text: string;
}
