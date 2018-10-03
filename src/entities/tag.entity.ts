import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn({
        name: 'tag_id',
        type: 'bigint'
    })
    tagId: number;

    @Column({ name: 'tag_text' })
    tagText: string;
}
