import { ApiModelProperty } from '@nestjs/swagger';

class QueryRunDto {

  @ApiModelProperty({
    type: Number,
    example: { runNumber: 1 },
    description: 'Filter on specific runNumber'
  })
  readonly runNumber: number;

  @ApiModelProperty({
    type: String,
    isArray: true,
    example: [{
      pageNumber: 2, timeO2Start: '1970-01-01',
      timeO2End: '2999-01-01', timeTrgStart: '1970-01-01',
      timeTrgEnd: '2999-01-01'
    }],
    description: 'Filter on page or start and end times of Runs'
  })
  readonly filters: string[];

}
