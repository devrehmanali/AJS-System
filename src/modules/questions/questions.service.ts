import { Injectable } from '@nestjs/common';
import { QuestionsRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async create(user: any): Promise<object | undefined> {
    return this.questionsRepository.create(user);
  }

  async fetchAll(): Promise<object | undefined> {
    return await this.questionsRepository.fetchAll();
  }

  async fetchUsersQuestions(): Promise<object | undefined> {
    const questionsResult = await this.questionsRepository.fetchRoleBaseQuestions({role: 'user'});

    if (questionsResult.length > 0) {
      questionsResult?.map((item: any) => {
        item.options.map((options: any) => {
          if (options.img) {
            if (!options.img.startsWith(process.env.BASE_URL_WELLAVI_AWS)) {
              options.img = `${process.env.BASE_URL}/assessment/${options.img}`
            }
          }
        })
      })
    }
    return questionsResult
  }

  async fetchCoachQuestions(): Promise<any> {
    const questionsResult = await this.questionsRepository.fetchRoleBaseQuestions({role: 'coach'});

    if (questionsResult.length > 0) {
      questionsResult?.map((item: any) => {
        item.options.map((options: any) => {
          if (options.img) {
            if (!options.img.startsWith(process.env.BASE_URL_WELLAVI_AWS)) {
              options.img = `${process.env.BASE_URL}/assessment/${options.img}`
            }
          }
        })
      })
    }
    return questionsResult
  }

  async findUserByQuestionId(questionId: any): Promise<any | null> {
    return this.questionsRepository.findUserByQuestionId(questionId);
  }
}
