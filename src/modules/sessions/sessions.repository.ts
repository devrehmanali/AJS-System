import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {StripeSessionDocument, StripeSessions} from '@/modules/stripe/schemas/stripe-sessions.schema';

@Injectable()
export class SessionsRepository {
  constructor(@InjectModel(StripeSessions.name) private stripeSessionModel: Model<StripeSessionDocument>) {}


}
