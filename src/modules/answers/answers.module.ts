import {forwardRef, Module} from '@nestjs/common';
import {AnswersController} from './answers.controller';
import {AnswersService} from './answers.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Answer, AnswerSchema} from '@/modules/answers/schemas/answer.schema';
import UsersModule from '@users/users.module';
import {AnswersRepository} from '@/modules/answers/answers.repository';
import {RabbitMqModule} from '@/modules/rabbit-mq/rabbit-mq.module';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        RabbitMqModule,
        MongooseModule.forFeature([{name: Answer.name, schema: AnswerSchema}]),
    ],
    controllers: [AnswersController],
    providers: [AnswersService, AnswersRepository],
    exports: [AnswersService, AnswersRepository],
})
export class AnswersModule {
}
