import { PublicationsRepository} from './publications.repository';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import {publicationPostDto} from '@/modules/publications/dto/publicaiotnsPost.dto';
import {UploadsService} from '@/modules/uploads/uploads.service';
import {UpdatePublicationDto} from '@/modules/publications/dto/update-publication.dto';
import {PERSONAL_INFORMATION, PUBLICATIONS} from '@/constants/rabbitMqEvents';
import {RabbitMqService} from '@/modules/rabbit-mq/rabbit-mq.service';
const { Types: { ObjectId: ObjectId } } = require("mongoose");

@Injectable()
export class PublicationsService {
    constructor(
        private usersService: UsersService,
        private publicationsRepository: PublicationsRepository,
        private uploadsService: UploadsService,
        private readonly rabbitMqService: RabbitMqService,) {
    }

    async savePublication(email: string, data: publicationPostDto): Promise<object | null> {
        const userData = await this.usersService.findUserByEmail(email);
        data.user_id = userData?.user_id
        const extension = data.post_image.split(';')[0].split('/')[1]

        // to declare some path to store your converted image
        const fileName = Date.now()+'.'+extension
        const image = data.post_image;
        const uploadedImageResponse = await this.uploadsService.uploadFileBase64(image, fileName)
        data.post_image = uploadedImageResponse.Location

        //add event into rabbitMQ Queue
        // @ts-ignore
        await this.rabbitMqService.eventEmitterOnRabbitMQ(PUBLICATIONS, {user_id: userData.user_id});

        return await this.publicationsRepository.storePublication(data)
    }

    async updatePublication(id: string, data: UpdatePublicationDto): Promise<object | null> {

        const filter = {
            _id: ObjectId(id)
        }

        if (data.post_image) {
            // to declare some path to store your converted image
            const fileName = Date.now()+'.png'
            const image = data.post_image;
            const uploadedImageResponse = await this.uploadsService.uploadFileBase64(image, fileName)
            data.post_image = uploadedImageResponse.Location
        }

        return await this.publicationsRepository.updatePublication(filter, data)
    }

    async fetchPublications(email: string, filterCheck: any): Promise<object | null> {
        const userData = await this.usersService.findUserByEmail(email);
        const userId = userData?.user_id
        let filter
        if (filterCheck && filterCheck === 'published') {
            filter = {
                user_id: userId,
                is_published: true
            }
        } else if (filterCheck && filterCheck === 'draft') {
            filter = {
                user_id: userId,
                is_published: false
            }
        } else {
            filter = {
                user_id: userId,
            }
        }
        return await this.publicationsRepository.findPublication(filter)
    }
    
    async getPublications(user_id: string): Promise<object | null> {
        return await this.publicationsRepository.getPublications(user_id)
    }
}

