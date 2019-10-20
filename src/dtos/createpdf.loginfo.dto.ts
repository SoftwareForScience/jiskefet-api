import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateLogInfo {
    @ApiModelProperty({
        example: 5,
        description: 'Log id'
    })
    @IsNumber()
    id: number;
}
