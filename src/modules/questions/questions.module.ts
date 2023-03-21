import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Questions, QuestionsSchema } from './schemas/questions.schema';
import { QuestionsRepository } from './questions.repository';
import { QuestionsService } from './questions.service';
import { QuestionsController } from '@/modules/questions/questions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questions.name, schema: QuestionsSchema },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsRepository],
  exports: [QuestionsService],
})
export default class QuestionsModule {}
