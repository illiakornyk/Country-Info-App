import { ApiProperty } from '@nestjs/swagger';
import { CountryCode } from '../enums/country-code.enum';

export class CountryInfo {
  @ApiProperty()
  commonName: string;

  @ApiProperty()
  officialName: string;

  @ApiProperty({ enum: CountryCode })
  countryCode: CountryCode;

  @ApiProperty()
  region: string;

  @ApiProperty({ type: () => [String] })
  borders: string[];
}
