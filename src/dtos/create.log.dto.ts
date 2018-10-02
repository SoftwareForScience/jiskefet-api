import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('logs')
export class CreateLogDto {

    @ApiModelProperty({
        example: ['run'],
        description: 'Enumerator',
    })
    subtype: [];
 
    @ApiModelProperty({
        example: ['human'],
        description: 'Enumerator',
    })
    origin: [];

    @ApiModelProperty({
        example: 'Sl4e12ofb83no92ns',
        description: 'CHAR',
    })
    creation_time: Date;

    @ApiModelProperty({
        example: 'Sl4e12ofb83no92ns',
        description: 'CHAR',
    })
    title: string;

    @ApiModelProperty({
        example: 'Sl4e12ofb83no92ns',
        description: 'CHAR',
    })
    text: string;

    @ApiModelProperty({
        example: 'Sl4e12ofb83no92ns',
        description: 'CHAR',
    })
    subsystem_fk_subsystem_id: number;
    
}
