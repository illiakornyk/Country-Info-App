import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CountryHoliday } from '../classes/country-holiday';
import { CalendarEvent } from '../entities/calendar-event.entity';
import { AddHolidays } from '../interfaces/add-holidays.interface';

@Injectable()
export class UserService {
  private readonly nagerApiBaseUrl: string;

  constructor(
    @InjectRepository(CalendarEvent)
    private readonly eventRepository: Repository<CalendarEvent>,
    private readonly configService: ConfigService,
  ) {
    this.nagerApiBaseUrl = this.configService.get<string>('NAGER_DATE_API_URL');
  }

  async addHolidaysToUserCalendar(
    userId: string,
    addHolidays: AddHolidays,
  ): Promise<{ message: string; count: number }> {
    const { year, countryCode, holidays: holidayFilter } = addHolidays;

    // 1. Fetch all holidays from the external API
    const apiUrl = `${this.nagerApiBaseUrl}/PublicHolidays/${year}/${countryCode}`;
    const { data: allHolidays } = await axios.get<CountryHoliday[]>(apiUrl);

    let holidaysToSave: CountryHoliday[];

    // 2. Check if a filter was provided and apply it
    if (holidayFilter && holidayFilter.length > 0) {
      const filterSet = new Set(holidayFilter);
      holidaysToSave = allHolidays.filter((holiday) =>
        filterSet.has(holiday.name),
      );
    } else {
      // If no filter, use the entire list
      holidaysToSave = allHolidays;
    }

    if (holidaysToSave.length === 0) {
      return { message: 'No matching holidays found to add.', count: 0 };
    }

    // 3. Map the holidays to our CalendarEvent entity format
    const eventsToCreate = holidaysToSave.map((holiday) => {
      const event = new CalendarEvent();
      event.userId = userId;
      event.name = holiday.name;
      event.date = holiday.date;
      event.countryCode = holiday.countryCode;
      return event;
    });

    await this.eventRepository.save(eventsToCreate);

    return {
      message: 'Successfully added holidays to calendar.',
      count: eventsToCreate.length,
    };
  }
}
