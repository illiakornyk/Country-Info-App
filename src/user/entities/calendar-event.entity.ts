import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CountryCode } from '../../country/enums/country-code.enum';

@Entity()
export class CalendarEvent {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: 'date' })
  @Column({ type: 'date' })
  date: string;

  @ApiProperty({ enum: CountryCode })
  @Column()
  countryCode: CountryCode;
}
