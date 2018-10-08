import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_filter')
export class UserFilter {

    @PrimaryGeneratedColumn({ name: 'filter_id' })
    filterId: number;

    @ManyToOne(
        type => User,
        user => user.userFilters,
        {
            primary: true
        }
    )
    @JoinColumn({ name: 'fk_user_id' })
    user: User;
}
