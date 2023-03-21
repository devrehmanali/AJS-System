import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Referral, ReferralDocument} from "@/modules/referral/schemas/referral.schema";

@Injectable()
export class ReferralRepository {
  constructor(@InjectModel(Referral.name) private referralModel: Model<ReferralDocument>) {}

  async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
    return  this.referralModel.findOneAndUpdate(filter,data, options);
  }
}
