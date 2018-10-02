/**
 * This DTO handles the data sent from the client ui.
 * In swagger it will handle example values to test the api.
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
export class CreateRunDto {

    @ApiModelProperty({
        example: ['test'],
        description: 'What kind of run.',
    })
    readonly run_type: [];

    @ApiModelProperty({
        example: ['test'],
        description: 'The quality of the run.',
    })
    readonly run_quality: [];

    @ApiModelProperty({
        example: 'Sl4e12ofb83no92ns',
        description: 'The id of the activity.',
    })
    @IsString() readonly activity_id: string;

    @ApiModelProperty({
        example: 16,
        description: 'Number of detectors during run.',
    })
    @IsInt() readonly n_detectors: number;

    @ApiModelProperty({
        example: 7,
        description: 'Number of FLPs that computed data',
    })
    @IsInt() readonly n_flps: number;

    @ApiModelProperty({
        example: 8,
        description: 'Number of EPNs that stored data',
    })
    @IsInt() readonly n_epns: number;

    @ApiModelProperty({
        example: 2,
        description: 'Number of timeframes',
    })
    @IsInt() readonly n_timeframes: number;

    @ApiModelProperty({
        example: 4,
        description: 'Number of subtimeframes',
    })
    @IsInt() readonly n_subtimeframes: number;

    @ApiModelProperty({
        example: 5,
        description: 'Amount of bytes read out',
    })
    @IsInt() readonly bytes_read_out: number;

    @ApiModelProperty({
        example: 12,
        description: 'What builder was used.',
    })
    @IsInt() readonly bytes_timeframe_builder: number;
}