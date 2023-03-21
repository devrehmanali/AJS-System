import { Injectable } from '@nestjs/common';
import {WellnessDimensionsRepository} from '@/modules/wellness-dimensions/wellness-dimensions.repository';

@Injectable()
export class WellnessDimensionsService {
    constructor(private readonly wellnessDimensionsRepository: WellnessDimensionsRepository) {}

    async findOneAndUpdate(filter: any, data: any): Promise<object | null> {
        return  this.wellnessDimensionsRepository.findOneAndUpdate(filter, data, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async fetchDimensionsName(): Promise<any> {
        return await this.wellnessDimensionsRepository.fetchDimensionsName()
    }

    async fetchAll(): Promise<any> {
        return await this.wellnessDimensionsRepository.fetchAll();
    }
}
