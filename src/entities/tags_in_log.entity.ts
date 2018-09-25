import { Entity, PrimaryColumn } from 'typeorm';

@Entity('TagsInLog')
export class TagsInLog {

    @PrimaryColumn()
    fk_log_id: number;

    @PrimaryColumn()
    fk_tag_id: number;
}