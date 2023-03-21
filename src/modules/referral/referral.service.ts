import { Injectable } from '@nestjs/common';
import {ReferralRepository} from "@/modules/referral/referral.repository";

@Injectable()
export class ReferralService {
    constructor(private readonly referralRepository: ReferralRepository) {}

    async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
        return  this.referralRepository.findOneAndUpdate(filter,data, options);
    }
}
