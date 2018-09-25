import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('role')
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: false,
    })
    role_name: string;
}
