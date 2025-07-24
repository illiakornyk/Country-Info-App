import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CountryCode } from '../../country/enums/country-code.enum';
import { ApiProperty } from '@nestjs/swagger';
import { USER_CONSTANTS } from '../constants/user.constants';

export class AddHolidaysDto {
  @ApiProperty({ enum: CountryCode })
  @IsEnum(CountryCode)
  readonly countryCode: CountryCode;

  @ApiProperty({
    type: Number,
    maximum: USER_CONSTANTS.DOMAIN.MAX_HOLIDAY_YEAR,
    minimum: USER_CONSTANTS.DOMAIN.MIN_HOLIDAY_YEAR,
  })
  @IsInt()
  @Min(1970)
  @Max(2100)
  readonly year: number;

  @ApiProperty({ type: () => [String], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly holidays?: string[];
}
