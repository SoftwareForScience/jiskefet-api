import { Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_filters')
export class UserFilter {

    @PrimaryGeneratedColumn({
        name: 'filter_id',
        type: 'bigint'
    })
    filterId: number;

    @ManyToOne(type => User, user => user.userFilters)
    @PrimaryColumn({ type: 'bigint' })
    user: User;
}
