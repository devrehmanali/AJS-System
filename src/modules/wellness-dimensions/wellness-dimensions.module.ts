import { Module } from '@nestjs/common';
import { WellnessDimensionsController } from './wellness-dimensions.controller';
import { WellnessDimensionsService } from './wellness-dimensions.service';
import {MongooseModule} from '@nestjs/mongoose';
import {
  WellnessDimensions,
  WellnessDimensionsSchema
} from '@/modules/wellness-dimensions/schemas/wellness-dimensions.schema';
import {WellnessDimensionsRepository} from '@/modules/wellness-dimensions/wellness-dimensions.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WellnessDimensions.name, schema: WellnessDimensionsSchema }]),
  ],
  controllers: [WellnessDimensionsController],
  providers: [WellnessDimensionsService, WellnessDimensionsRepository],
  exports: [WellnessDimensionsService, WellnessDimensionsRepository]
})
export class WellnessDimensionsModule {}
