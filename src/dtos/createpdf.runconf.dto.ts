import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateRunConf {
    @ApiModelProperty({
        example: 5,
        description: 'ID of the previous run'
    })
    @IsNumber()
    id1: number;
    @ApiModelProperty({
        example: 7,
        description: 'ID of the current run'
    })
    @IsNumber()
    id2: number;
}
