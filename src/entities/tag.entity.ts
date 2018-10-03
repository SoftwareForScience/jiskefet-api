import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class Tag {

    @PrimaryGeneratedColumn({ name: 'tag_id' })
    tagId: number;

    @Column({ name: 'tag_text' })
    tagText: string;
}
