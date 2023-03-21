import { Module } from '@nestjs/common';
import { SettingRepository } from './setting.repository';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import UsersModule from '../users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import {Setting, SettingSchema} from "@/modules/setting/schemas/settings.schema";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
  controllers: [SettingController],
  providers: [SettingService, SettingRepository],
  exports: [SettingService],
})
export default class SettingModule {}
