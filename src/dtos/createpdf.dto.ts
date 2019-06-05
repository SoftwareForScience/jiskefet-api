import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class createUserData{
    @ApiModelProperty({
        example: "Nick",
        description: 'First worker\'s name'
    })
    fname: string;

    @ApiModelProperty({
        example: "Fury",
        description: 'Last worker\'s name'
    })
    lname: string;

    @ApiModelProperty({
        example: "Student",
        description: 'Occupation'
    })
    occupation: string;

    @ApiModelProperty({
        example: "Something wrong! There is a big black hole! Help me!",
        description: 'Bug report'
    })
    bugReport: string;

}
export class createLogInfo{
    @ApiModelProperty({
        example: 5,
        description: 'Log id'
    })
    @IsNumber()
    id: number;
}
export class createRunConf{
    @ApiModelProperty({
        example: 5,
        description: 'ID of the previos run'
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