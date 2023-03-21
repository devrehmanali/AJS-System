import { Module } from '@nestjs/common';
import { ReferralController } from './referral.controller';
import { ReferralService } from './referral.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Referral, ReferralSchema} from "@/modules/referral/schemas/referral.schema";
import {ReferralRepository} from "@/modules/referral/referral.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Referral.name, schema: ReferralSchema }]),
  ],
  controllers: [ReferralController],
  providers: [ReferralService, ReferralRepository],
  exports: [ReferralService, ReferralRepository]
})
export class ReferralModule {}
