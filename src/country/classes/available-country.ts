import { ApiProperty } from '@nestjs/swagger';
import { CountryCode } from '../enums/country-code.enum';

export class AvailableCountry {
  @ApiProperty({ enum: CountryCode })
  countryCode: CountryCode;

  @ApiProperty()
  name: string;
}
