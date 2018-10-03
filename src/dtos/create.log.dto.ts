import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('logs')
export class CreateLogDto {

    @ApiModelProperty({
        example: ['run'],
        description: 'What kind of log is it?',
    })
    subtype: [];

    @ApiModelProperty({
        example: ['human'],
        description: 'Where did the log come from?',
    })
    origin: [];

    @ApiModelProperty({
        example: '01-10-2018',
        description: 'Date of creation',
    })
    creationTime: Date;

    @ApiModelProperty({
        example: 'log for run 12',
        description: 'describes the log in short',
    })
    title: string;

    @ApiModelProperty({
        example: 'lorum ipsum',
        description: 'describes the log in depth',
    })
    text: string;
}
