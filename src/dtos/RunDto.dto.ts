import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
export class RunDto {
    
    @ApiModelProperty({
        example: '2018-05-05 10:00:00+01',
        description: '',
    })
    readonly time_02_start: Date;

    @ApiModelProperty({
        example: '2018-05-05 10:00:00+01',
        description: '',
    })
    readonly time_trg_start: Date;

    @ApiModelProperty({
        example: '2018-05-05 10:00:00+01',
        description: '',
    })
    readonly time_trg_end: Date;

    @ApiModelProperty({
        example: '2018-05-05 10:00:00+01',
        description: '',
    })
    readonly time_02_end: Date;

    @ApiModelProperty({
        example: 'Sl4e12ofb83no92ns',
        description: '',
    })
    @IsInt() readonly activity_id: number;

    @ApiModelProperty({
        example: 16,
        description: '',
    })
    @IsInt() readonly n_detectors: number;

    @ApiModelProperty({
        example: 7,
        description: '',
    })
    @IsInt() readonly n_flps: number;

    @ApiModelProperty({
        example: 8,
        description: '',
    })
    @IsInt() readonly n_epns: number;

    @ApiModelProperty({
        example: 2000,
        description: '',
    })
    @IsInt() readonly n_timeframes: number;

    @ApiModelProperty({
        example: 14000,
        description: '',
    })
    @IsInt() readonly n_subtimeframes: number;

    @ApiModelProperty({
        example: 14000000,
        description: '',
    })
    @IsInt() readonly bytes_read_out: number;

    @ApiModelProperty({
        example: 40000,
        description: '',
    })
    @IsInt() readonly bytes_timeframe_builder: number;
}