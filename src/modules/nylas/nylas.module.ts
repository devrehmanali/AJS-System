import { Module } from '@nestjs/common';
import { NylasController } from './nylas.controller';
import { NylasService } from './nylas.service';
import UsersModule from '@users/users.module';
import {SessionsModule} from '@/modules/sessions/sessions.module';

@Module({
  controllers: [NylasController],
  providers: [NylasService],
  imports: [UsersModule, SessionsModule]
})
export class NylasModule {}
