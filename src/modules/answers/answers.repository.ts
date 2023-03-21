import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Answer, AnswerDocument} from '@/modules/answers/schemas/answer.schema';

@Injectable()
export class AnswersRepository {
  constructor(
    @InjectModel(Answer.name) private answerDocumentModel: Model<AnswerDocument>,
  ) {}

  async createAnswers(data: object): Promise<any> {
    return this.answerDocumentModel.create(data);
  }

  async findAnswers(user_id: string | undefined, userRole: string): Promise<any> {
    return this.answerDocumentModel.find({user_id: user_id, role: userRole});
  }

  async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
    return  this.answerDocumentModel.findOneAndUpdate(filter,data, options);
  }

  async updateAnswers(criteria: object, data: object): Promise<object> {
    return this.answerDocumentModel.updateOne(criteria, data);
  }

  async findAnswersByUserId(user_id: any): Promise<object | null> {
    return this.answerDocumentModel.findOne({ user_id });
  }

  async deleteAnswers(filter: object): Promise<any> {
    return this.answerDocumentModel.deleteMany(filter);
  }
}
