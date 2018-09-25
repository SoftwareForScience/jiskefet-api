import { Entity, PrimaryColumn } from 'typeorm';

@Entity('TagsInRun')
export class TagsInRun {

    @PrimaryColumn()
    fk_run_number: number;

    @PrimaryColumn()
    fk_tag_id: number;
}
