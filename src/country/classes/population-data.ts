import { ApiProperty } from '@nestjs/swagger';

export class PopulationData {
  @ApiProperty()
  year: number;

  @ApiProperty()
  value: number;
}
