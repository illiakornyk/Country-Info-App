import { ApiProperty } from '@nestjs/swagger';
import { PopulationData } from './population-data';

export class CountryExtendedInfo {
  @ApiProperty({ type: () => [String] })
  borderCountries: string[];

  @ApiProperty({ type: () => [PopulationData] })
  population: PopulationData[];

  @ApiProperty()
  flagUrl: string;
}
