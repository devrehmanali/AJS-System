import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileRepository {
  findOne(
    userId: string,
  ): object | PromiseLike<object | undefined> | undefined {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async createProfile(profile: CreateProfileDto): Promise<any> {
    return this.profileModel.create(profile);
  }

  async findOneAndUpdate(
    filter: any,
    data: any,
    options: object,
  ): Promise<object | null> {
    return this.profileModel.findOneAndUpdate(filter, data, options);
  }

  async updateProfile(criteria: object, data: object): Promise<object> {
    return this.profileModel.updateOne(criteria, data);
  }

  async findProfileByUserId(filter: any): Promise<object | null> {
    return this.profileModel.findOne(filter);
  }

  async findUserProfileByUserId(userId: string): Promise<any> {
    return this.profileModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'userData',
        },
      },
      {
        $lookup: {
          from: 'settings',
          localField: 'user_id',
          foreignField: 'user_id',
          pipeline: [
            {
              $match: { type: 'user' },
            },
          ],
          as: 'settings',
        },
      },
      {
        $unwind: '$userData',
      },
      {
        $unwind: '$settings',
      },
      {
        $match: {
          user_id: userId,
          type: 'user',
        },
      },
    ]);
  }
}
