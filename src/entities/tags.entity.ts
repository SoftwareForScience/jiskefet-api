import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tags')
export class Tags {

    @PrimaryGeneratedColumn({type: 'bigint'})
    tag_id: number;

    @Column()
    tag_text: string;
}
