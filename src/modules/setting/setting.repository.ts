import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Setting, SettingDocument} from "@/modules/setting/schemas/settings.schema";
import {User} from "@users/schemas/users.schema";

@Injectable()
export class SettingRepository {
  constructor(
      @InjectModel(Setting.name) private settingModel: Model<SettingDocument>,
  ) {}

  async create(setting: any): Promise<any> {
    return await this.settingModel.create(setting);
  }

  async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
    return this.settingModel.findOneAndUpdate(filter,data, options);
  }

  async updateSettingByUserId(criteria: object, data: User): Promise<any> {
    return this.settingModel.updateOne(criteria, data);
  }

  async findSettingByUserId(user_id: any, type = 'coach'): Promise<object | null> {
    return this.settingModel.findOne({ user_id, type });
  }


}
