import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AddHolidaysDto } from '../dtos/add-holidays.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/:userId/calendar/holidays')
  addHolidaysToCalendar(
    @Param('userId') userId: string,
    @Body() addHolidaysDto: AddHolidaysDto,
  ) {
    return this.userService.addHolidaysToUserCalendar(userId, addHolidaysDto);
  }
}
