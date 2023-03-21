import { Publications,PublicationsDocument } from './schemas/publicatoins.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose';

@Injectable()
export class PublicationsRepository {
    constructor(@InjectModel(Publications.name) private publicationsModel: Model<PublicationsDocument>) { }
    
    async storePublication(data: object): Promise<any> {
        return await this.publicationsModel.create(data)
    }

    async updatePublication(criteria: object, data: object): Promise<any> {
        return this.publicationsModel.updateOne(criteria, data)
    }

    async findPublication(filter: object): Promise<any> {
        return this.publicationsModel.find(filter)
    }

    async getPublications(userId: string | undefined): Promise<any> {
        const response = await this.publicationsModel.aggregate([
            {
              '$match': {
                'user_id': userId
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'user_id', 
                'foreignField': 'user_id', 
                'as': 'user'
              }
            }, {
              '$unwind': '$user'
            },
          ])

        return response
    }
}
