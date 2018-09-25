import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('SubSystemPermissions')
export class SubSystemPermissions {

    @PrimaryColumn({ type: 'int' })
    fk_user_id: number;

    @PrimaryColumn({ type: 'int' })
    fk_subsystem_id: number;

    @Column({ type: 'boolean' })
    is_member: boolean;

    @Column({ type: 'boolean' })
    edit_eor_reason: boolean;
}