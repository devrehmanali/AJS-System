import { Publications,PublicationsSchema } from './schemas/publicatoins.schema';
import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { MongooseModule } from '@nestjs/mongoose';
import UsersModule from '../users/users.module';
import {PublicationsRepository} from '@/modules/publications/publications.repository';
import {UploadsModule} from '@/modules/uploads/uploads.module';
import {RabbitMqModule} from '@/modules/rabbit-mq/rabbit-mq.module';
@Module({
  imports: [
    UsersModule,
    UploadsModule,
      RabbitMqModule,
    MongooseModule.forFeature([{ name: Publications.name, schema: PublicationsSchema }]),
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationsRepository],
  exports: [PublicationsService, PublicationsRepository],
})

export class PublicationsModule { }
