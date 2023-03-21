import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Reasoning, ReasoningDocument} from '@/modules/reasoning/schemas/reasoning.schema';


@Injectable()
export class ReasoningRepository {
  constructor(
    @InjectModel(Reasoning.name)
    private reasoningDocumentModel: Model<ReasoningDocument>,
  ) {}

  async create(data: any): Promise<object | undefined> {
    return this.reasoningDocumentModel.create(data);
  }

  async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
    return  this.reasoningDocumentModel.findOneAndUpdate(filter,data, options);
  }

  async fetchAllReasoning(): Promise<any> {
    return  this.reasoningDocumentModel.find({});
  }

}
