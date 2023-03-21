import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {
    WellnessDimensions,
    WellnessDimensionsDocument
} from '@/modules/wellness-dimensions/schemas/wellness-dimensions.schema';

@Injectable()
export class WellnessDimensionsRepository {
    constructor(
        @InjectModel(WellnessDimensions.name)
        private wellnessDimensionsDocumentModel: Model<WellnessDimensionsDocument>,
    ) {}

    async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
        return  this.wellnessDimensionsDocumentModel.findOneAndUpdate(filter,data, options);
    }

    async fetchAll(): Promise<any> {
        return this.wellnessDimensionsDocumentModel.find();
    }

    async fetchDimensionsName(): Promise<any> {
        return this.wellnessDimensionsDocumentModel.distinct('dimension_name')
    }
}
