import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity('Users')
export class Users {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    user_id: number;

    @Column({ type: 'int' })
    sams_id: number;

    @Column({ type: 'varchar' })
    token: string;

    @Column({ type: 'timestamp' })
    token_valid_until: Timestamp;
}