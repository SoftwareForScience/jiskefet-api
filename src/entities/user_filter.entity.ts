import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('UserFilter')
export class UserFilter {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    filter_id: number;

    @ManyToOne(type => User, user => user.userFilter)
    user: User;
}