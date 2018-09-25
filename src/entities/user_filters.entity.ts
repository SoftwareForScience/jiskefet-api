import { Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity('UserFilters')
export class UserFilters {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    filter_id: number;

    @ManyToOne(type => Users, user => user.userFilters)
    user: Users;
}