import {Injectable} from '@nestjs/common';
import {CreateCommunityDto} from '@/modules/communities/dto/create-community.dto';
import {UsersService} from '@users/users.service';
import {CommunitiesRepository} from '@/modules/communities/communities.repository';
import {CreateCommunityMembersDto} from '@/modules/communities/dto/create-community-members.dto';
import {UploadsService} from '@/modules/uploads/uploads.service';
const { Types: { ObjectId: ObjectId } } = require("mongoose");

@Injectable()
export class CommunitiesService {
    constructor(
        private readonly communitiesRepository: CommunitiesRepository,
        private readonly userService: UsersService,
        private readonly uploadsService: UploadsService,
    ) {
    }


    async createCommunity(reqBody: CreateCommunityDto, userEmail: string): Promise<object> {
        const user = await this.userService.findUserByEmail(userEmail);
        const userId: string | undefined = user?.user_id;
        // @ts-ignore
        reqBody.user_id = userId;

        if (reqBody.image) {
            const extension = reqBody.image.split(';')[0].split('/')[1]
            const fileName = Date.now()+'.'+extension
            const image = reqBody.image;
            const uploadedImageResponse = await this.uploadsService.uploadFileBase64(image, fileName)
            reqBody.image = uploadedImageResponse.Location
        }

        return await this.communitiesRepository.findOneAndUpdate({name: reqBody.name}, reqBody, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async deleteCommunity(communityId: string): Promise<object> {
        const result = await this.communitiesRepository.deleteCommunity({_id: ObjectId(communityId)});

        if (result) {
            await this.communitiesRepository.deleteCommunityMembers({community_id: communityId});
        }

        return result
    }

    async deleteCommunityMember(communityId: string, userId: string): Promise<object> {

        return await this.communitiesRepository.deleteCommunityMembers({community_id: communityId, community_member_user_id: userId});
    }

    async fetchCommunities(userEmail: string): Promise<any> {
        const user = await this.userService.findUserByEmail(userEmail);
        const userId: string | undefined = user?.user_id;

        const result = await this.communitiesRepository.findCommunities(userId);

        return result
    }

    async fetchCommunityById(communityId: string): Promise<any> {
        const result = await this.communitiesRepository.findCommunityById(communityId);

        return result
    }

    async addCommunityMembers(reqBody: CreateCommunityMembersDto): Promise<object> {
        reqBody.user_id.map((user_id) => {
             this.communitiesRepository.findOneAndUpdateCommunityMembers({
                community_id: reqBody.community_id,
                 community_member_user_id: user_id
            }, {
                community_id: reqBody.community_id,
                 community_member_user_id: user_id
            }, {
                new: true,
                upsert: true // Make this update into an upsert
            });
        })
        return {}
    }

}
