/**
 * This DTO handles the data sent from the client ui. 
 * In swagger it will handle example values to test the api.
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
export class RunDto {

    @ApiModelProperty({
        example: '2018-05-05 10:12:00+01',
        description: 'TimeStamp',
    })
    readonly time_o2_start: Date;

    @ApiModelProperty({
        example: '2018-05-05 10:13:00+01',
        description: 'TimeStamp',
    })
    readonly time_trg_start: Date;

    @ApiModelProperty({
        example: '2018-05-05 10:14:00+01',
        description: 'TimeStamp',
    })
    readonly time_trg_end: Date;

    @ApiModelProperty({
        example: '2018-05-05 10:15:00+01',
        description: 'TimeStamp',
    })
    readonly time_o2_end: Date;

    @ApiModelProperty({
        example: ['test'],
        description: 'Enumerator',
    })
    @IsInt() readonly run_type: [];

    @ApiModelProperty({
        example: ['test'],
        description: 'Enumerator',
    })
    @IsInt() readonly run_quality: [];

    @ApiModelProperty({
        example: 'Sl4e12ofb83no92ns',
        description: 'CHAR',
    })
    @IsInt() readonly activity_id: string;

    @ApiModelProperty({
        example: 16,
        description: 'INT',
    })
    @IsInt() readonly n_detectors: number;

    @ApiModelProperty({
        example: 7,
        description: 'INT',
    })
    @IsInt() readonly n_flps: number;

    @ApiModelProperty({
        example: 8,
        description: 'INT',
    })
    @IsInt() readonly n_epns: number;

    @ApiModelProperty({
        example: 2,
        description: 'INT',
    })
    @IsInt() readonly n_timeframes: number;

    @ApiModelProperty({
        example: 4,
        description: 'INT',
    })
    @IsInt() readonly n_subtimeframes: number;

    @ApiModelProperty({
        example: 5,
        description: 'INT',
    })
    @IsInt() readonly bytes_read_out: number;

    @ApiModelProperty({
        example: 12,
        description: 'INT',
    })
    @IsInt() readonly bytes_timeframe_builder: number;
}