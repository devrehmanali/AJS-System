import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './schemas/profile.schema';
import { ProfileRepository } from './profile.repository';
import { UsersService } from '../users/users.service';
import { SettingService } from '@/modules/setting/setting.service';
import { SUCCESSFULLY_SAVED } from '@/constants/constants';
import { CreateUserProfileDto } from '@/modules/profile/dto/create-user-profile.dto';
import { UploadsService } from '@/modules/uploads/uploads.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UsersService,
    private readonly settingsService: SettingService,
    private readonly uploadsService: UploadsService,
  ) {}

  async createProfile(
    profile: CreateProfileDto,
    userEmail: string,
  ): Promise<object> {
    const response = { status: 201, message: SUCCESSFULLY_SAVED };
    const user = await this.userService.findUserByEmail(userEmail);
    const userId: string | undefined = user?.user_id;
    // @ts-ignore
    profile.profile.user_id = userId;
    // @ts-ignore
    if (!profile.type) {
      // @ts-ignore
      profile.type = 'coach';
    }
    await this.profileRepository.findOneAndUpdate(
      { user_id: userId, type: profile.type },
      profile.profile,
      {
        new: true,
        upsert: true, // Make this update into an upsert
      },
    );

    // @ts-ignore
    await this.settingsService.findOneAndUpdate(
      { user_id: userId, type: profile.type },
      profile.settings,
      {
        new: true,
        upsert: true, // Make this update into an upsert
      },
    );
    return response;
  }

  async create(profile: CreateProfileDto): Promise<Profile> {
    return this.profileRepository.createProfile(profile);
  }

  async findUserByUserId(
    userEmail: string,
    userType: string,
  ): Promise<object | null> {
    const user = await this.userService.findUserByEmail(userEmail);
    const userId: string | undefined = user?.user_id;
    let filter;

    if (userType && userType === 'user') {
      filter = {
        user_id: userId,
        type: userType,
      };
    } else {
      filter = {
        user_id: userId,
        type: { $ne: 'user' },
      };
    }
    return await this.profileRepository.findProfileByUserId(filter);
  }

  async findProfilePublicViewByUserId(userId: string): Promise<object | null> {
    const data = {
      user_id: userId,
      type: { $ne: 'user' },
    };
    return await this.profileRepository.findProfileByUserId(data);
  }

  async findUserPublicProfileByUserId(userId: string): Promise<any> {
    return await this.profileRepository.findUserProfileByUserId(userId);
  }

  async updateProfile(
    userId: string,
    req: any,
    userType: string,
  ): Promise<object> {
    let filter;

    if (userType && userType === 'user') {
      filter = {
        user_id: userId,
        type: userType,
      };
    } else {
      filter = {
        user_id: userId,
        type: { $ne: 'user' },
      };
    }

    return this.profileRepository.updateProfile(filter, req);
  }

  async updateProfileUserSide(
    email: string,
    data: any,
    userType: string,
  ): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    const userId: string | undefined = user?.user_id;
    try {
      const profileFilter = {
        user_id: userId,
        type: userType,
      };

      const profileData = {
        title: data.position,
        experience: data.company,
        education: data?.education || null,
        about: data.about,
        language: data.language,
      };
      await this.profileRepository.updateProfile(profileFilter, profileData);

      const userData = {
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender,
      };
      await this.userService.updateByEmail(user?.email || '', userData);

      const settingsData = {
        country: data.country,
        type: userType,
      };
      await this.settingsService.updateSettings(
        user?.email || '',
        settingsData,
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateCoachCertificates(
    userId: string,
    req: any,
    userType: string,
  ): Promise<object> {
    const images = [];
    const filter = {
      user_id: userId,
      type: { $ne: 'user' },
    };

    for (let i = 0; i < req.certificates.length; i++) {
      const extension = req.certificates[i].split(';')[0].split('/')[1];
      // to declare some path to store your converted image
      const fileName = Date.now() + '.' + extension;
      const image = req.certificates[i];
      const uploadedImageResponse = await this.uploadsService.uploadFileBase64(
        image,
        fileName,
      );
      images.push(uploadedImageResponse.Location);
    }

    return this.profileRepository.updateProfile(filter, {
      certificates: images,
    });
  }

  async updateProfileIntroVideo(
    userId: string,
    req: any,
    userType: string,
  ): Promise<object> {
    let filter;

    if (userType && userType === 'user') {
      filter = {
        user_id: userId,
        type: userType,
      };
    } else {
      filter = {
        user_id: userId,
        type: { $ne: 'user' },
      };
    }

    if (req.intro_video) {
      const extension = req.intro_video.split(';')[0].split('/')[1];
      const fileName = Date.now() + '.' + extension;
      const image = req.intro_video;
      const uploadIntroVideoRes = await this.uploadsService.uploadVideoBase64(
        image,
        fileName,
      );
      console.log(
        uploadIntroVideoRes,
        uploadIntroVideoRes?.Location,
        'uploadIntroVideoRes',
      );
      req.intro_video = uploadIntroVideoRes?.Location;
    }

    return this.profileRepository.updateProfile(filter, req);
  }

  //User Profile Section
  async createUserProfile(
    profile: CreateUserProfileDto,
    userEmail: string,
  ): Promise<object> {
    const response = { status: 201, message: SUCCESSFULLY_SAVED };
    const user = await this.userService.findUserByEmail(userEmail);
    const userId: string | undefined = user?.user_id;

    profile.user_id = userId;
    profile.type = 'user';

    await this.profileRepository.findOneAndUpdate(
      { user_id: userId, type: profile.type },
      profile,
      {
        new: true,
        upsert: true, // Make this update into an upsert
      },
    );

    return response;
  }
}
