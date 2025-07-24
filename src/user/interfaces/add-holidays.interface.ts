import { CountryCode } from '../../country/enums/country-code.enum';

export interface AddHolidays {
  readonly countryCode: CountryCode;
  readonly year: number;
  readonly holidays?: string[];
}
