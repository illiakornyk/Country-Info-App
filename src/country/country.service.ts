import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { CountryCode } from './enums/country-code.enum';
import { CountryExtendedInfo } from './classes/country-extended-info';
import { AvailableCountry } from './classes/available-country';
import { CountryInfo } from './classes/country-info';
import { PopulationData } from './classes/population-data';

@Injectable()
export class CountryService {
  async getAvailableCountries(): Promise<AvailableCountry[]> {
    const { data }: { data: AvailableCountry[] } = await axios.get(
      `${process.env.NAGER_DATE_API_URL}/AvailableCountries`,
    );
    return data;
  }

  async getCountryInfo(countryCode: CountryCode): Promise<CountryExtendedInfo> {
    const nagerApiUrl = `${process.env.NAGER_DATE_API_URL}/CountryInfo/${countryCode}`;

    let countryDetails: CountryInfo;
    try {
      const response = await axios.get(nagerApiUrl);
      countryDetails = response.data;
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.status === HttpStatus.NOT_FOUND
      ) {
        throw new NotFoundException(
          `Country with code '${countryCode}' not found.`,
        );
      }
      throw error;
    }

    const countryName = countryDetails.commonName;
    const borderCountries = countryDetails.borders || [];

    const populationPromise = this.fetchPopulationData(countryName);
    const flagPromise = this.fetchFlagUrl(countryName);

    const [population, flagUrl] = await Promise.all([
      populationPromise,
      flagPromise,
    ]);

    return {
      borderCountries,
      population,
      flagUrl,
    };
  }

  private async fetchPopulationData(
    countryName: string,
  ): Promise<PopulationData[]> {
    const apiUrl = `${process.env.COUNTRIES_NOW_API_URL}/countries/population`;
    try {
      const { data } = await axios.post(apiUrl, { country: countryName });
      const populationCounts: PopulationData[] = data.data.populationCounts;
      return populationCounts;
    } catch (error: unknown) {
      return [];
    }
  }

  private async fetchFlagUrl(countryName: string): Promise<string> {
    const apiUrl = `${process.env.COUNTRIES_NOW_API_URL}/countries/flag/images`;
    try {
      const { data } = await axios.post(apiUrl, { country: countryName });
      const flagUrl: string = data.data.flag;
      return flagUrl;
    } catch (error: unknown) {
      return 'Flag not found.';
    }
  }
}
