import {Injectable} from '@nestjs/common';
import * as bcrypt from "bcrypt";
import {UsersService} from "@users/users.service";
import {AuthService} from "@auth/auth.service";
import {Profile} from "@/modules/profile/schemas/profile.schema";
import {SettingRepository} from "@/modules/setting/setting.repository";

@Injectable()
export class SettingService {
    constructor(
        private usersService: UsersService,
        private settingRepository: SettingRepository) {
    }

    async updateSettings(email: string, data: any): Promise<object | null> {
        let user :any;
        let type = 'coach'
        if (!data.type || data.type === 'user') {
            type = data.type;
        }
        const userData = await this.usersService.findUserByEmail(email);
        // @ts-ignore
        const user_id = userData.user_id;
        // user = await this.settingRepository.updateSettingByUserId({user_id, type}, data);
        user = await this.settingRepository.findOneAndUpdate({user_id, type}, data, {
            new: true,
            upsert: true // Make this update into an upsert
        });

        return user;
    }

    async fetchSettings(email: string, data: any): Promise<object | null> {
        const user = await this.usersService.findUserByEmail(email);
        const userId: string | undefined = user?.user_id;
        let type = 'coach'
        if (data && data.type === 'user') {
            type = data.type;
        }

        return await this.settingRepository.findSettingByUserId(userId, type);
    }

    async create(setting: any): Promise<Profile> {
        return this.settingRepository.create(setting);
    }

    async findOneAndUpdate(filter: object, data: any, options: object): Promise<any> {
        return this.settingRepository.findOneAndUpdate(filter, data, options);
    }


}
