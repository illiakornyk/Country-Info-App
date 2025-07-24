import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class CountryService {
  constructor(private httpService: HttpService) {}

  getAvailableCountries() {
    return this.httpService
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .pipe(map((response) => response.data));
  }

  getCountryInfo(countryCode: string) {}
}
