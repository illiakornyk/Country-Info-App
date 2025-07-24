import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseEnumPipe,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryCode } from './enums/country-code.enum';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountryExtendedInfo } from './classes/country-extended-info';
import { AvailableCountry } from './classes/available-country';

@ApiTags('countries')
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('available')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of available countries',
    type: () => AvailableCountry,
    isArray: true,
  })
  getAvailableCountries() {
    return this.countryService.getAvailableCountries();
  }

  @Get(':countryCode')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns country info',
    type: () => CountryExtendedInfo,
  })
  getCountryInfo(
    @Param('countryCode', new ParseEnumPipe(CountryCode))
    countryCode: CountryCode,
  ) {
    return this.countryService.getCountryInfo(countryCode);
  }
}
