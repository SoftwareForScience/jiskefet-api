import { ApiModelProperty } from '@nestjs/swagger';
export class CreateUserData {
    @ApiModelProperty({
        example: 'Nick',
        description: 'First worker\'s name'
    })
    fname: string;

    @ApiModelProperty({
        example: 'Fury',
        description: 'Last worker\'s name'
    })
    lname: string;

    @ApiModelProperty({
        example: 'Student',
        description: 'Occupation'
    })
    occupation: string;

    @ApiModelProperty({
        example: 'Something wrong! There is a big black hole! Help me!',
        description: 'Bug report'
    })
    bugReport: string;

}
