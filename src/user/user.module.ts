import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([CalendarEvent])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
