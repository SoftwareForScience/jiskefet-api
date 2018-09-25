import { Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('UserFilters')
export class UserFilters {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    filter_id: number;

    @PrimaryColumn({ type: 'int' })
    fk_user_id: number
}