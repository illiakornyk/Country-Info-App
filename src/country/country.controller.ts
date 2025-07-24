import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiProperty } from '@nestjs/swagger';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiProperty()
  @Get('available')
  getAvailableCountries() {
    return this.countryService.getAvailableCountries();
  }

  @ApiProperty()
  @Get(':countryCode')
  getCountryInfo(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryInfo(countryCode);
  }
}
