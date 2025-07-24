import { ApiProperty } from '@nestjs/swagger';
import { CountryCode } from '../../country/enums/country-code.enum';

export class CountryHoliday {
  @ApiProperty()
  readonly date: string;

  @ApiProperty()
  readonly localName: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ enum: CountryCode })
  readonly countryCode: CountryCode;
}
