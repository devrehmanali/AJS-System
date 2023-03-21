import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {communities, communitiesDocument} from '@/modules/communities/schemas/communties.schema';
import {communityMembers, communityMembersDocument} from '@/modules/communities/schemas/communty-members.schema';

const {Types: {ObjectId: ObjectId}} = require("mongoose");

@Injectable()
export class CommunitiesRepository {
  constructor(
      @InjectModel(communities.name) private communityModel: Model<communitiesDocument>,
      @InjectModel(communityMembers.name) private communityMembersModel: Model<communityMembersDocument>,
  ) {
  }

  async findOneAndUpdate(filter: any, data: any, options: object): Promise<any> {
    return this.communityModel.findOneAndUpdate(filter, data, options);
  }

  async deleteCommunity(filter: object): Promise<any> {
    return this.communityModel.deleteOne(filter);
  }

  async findCommunities(userId: string | undefined): Promise<any> {


    const result = await this.communityModel.aggregate([
      {
        $addFields: {'id': {'$toString': '$_id'}}
      },
      {
        $lookup: {
          from: "community-member",
          localField: "id",
          foreignField: "community_id",
          as: "result"
        }
      },
      {
        $match: {
          user_id: userId
        }
      },
      {
        $project:
            {
              _id: 0,
              communities: "$$ROOT",
              numOfMembers: {$size: "$result"},
            }
      }
    ])
    return result
  }

  async findCommunityById(communityId: string | undefined): Promise<any> {

    const result = await this.communityModel.aggregate([
      {
        $addFields: {'id': {'$toString': '$_id'}}
      },
      {
        $lookup: {
          from: "community-member",
          localField: "id",
          foreignField: "community_id",
          as: "members",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "community_member_user_id",
                foreignField: "user_id",
                as: "user",
              }
            },
            {
              $unwind: '$user'
            }
          ]
        }
      },
      {
        $match: {
          _id: ObjectId(communityId)
        }
      },
      {
        $project:
            {
              _id: 0,
              communities: "$$ROOT",
              numOfMembers: {$size: "$members"},
            }

      }
    ])
    return result
  }

  async deleteCommunityMembers(filter: object): Promise<any> {
    return this.communityMembersModel.deleteMany(filter);
  }

  async findOneAndUpdateCommunityMembers(filter: any, data: any, options: object): Promise<any> {
    return await this.communityMembersModel.findOneAndUpdate(filter, data, options);
  }
}
