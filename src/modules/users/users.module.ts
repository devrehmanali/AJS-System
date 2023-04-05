import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from "@users/users.controller";
import { UploadsModule } from '@/modules/uploads/uploads.module';
import { CoachRejectionReasoning, CoachRejectionReasoningSchema } from '@users/schemas/coach-rejection-reasoning.schema';
import { UserDeviceIds, UserDeviceIdsSchema } from '@users/schemas/user-device-ids.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, {
            name: CoachRejectionReasoning.name,
            schema: CoachRejectionReasoningSchema
        }, { name: UserDeviceIds.name, schema: UserDeviceIdsSchema }]),
        UploadsModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService, UsersRepository],
})
export default class UsersModule {
}
