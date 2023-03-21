import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Questions,
  QuestionsDocument,
} from '@/modules/questions/schemas/questions.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class QuestionsRepository {
  constructor(
    @InjectModel(Questions.name)
    private questionModel: Model<QuestionsDocument>,
  ) {}

  async create(question: any): Promise<object | undefined> {
    return this.questionModel.create(question);
  }

  async fetchAll(): Promise<object | undefined> {
    return this.questionModel.find();
  }

  async fetchRoleBaseQuestions(filter: object): Promise<any> {
    return this.questionModel.find(filter);
  }

  async findUserByQuestionId(questionId: any): Promise<any | null> {
    return this.questionModel.findOne({ _id: new ObjectId(`${questionId}`) });
  }
}
