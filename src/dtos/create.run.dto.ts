/**
 * This DTO handles the data sent from the client ui.
 * In swagger it will handle example values to test the api.
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
export class CreateRunDto {

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
    @IsString() readonly activity_id: string;

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