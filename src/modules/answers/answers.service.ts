import { Injectable } from '@nestjs/common';
import {AnswersRepository} from '@/modules/answers/answers.repository';
import {UsersService} from '@users/users.service';

@Injectable()
export class AnswersService {
    constructor(private readonly answersRepository: AnswersRepository,
                private readonly userService: UsersService,) {}

    async calculatingResult(email: string, reqBody: any): Promise<any> {
        const answers = reqBody.request;
        // TODO here we will call third party api
        //code.....

        //After getting result from third party and store it in our database
        //get userID against user email
        const user = await this.userService.findUserByEmail(email);
        const userId: string | undefined = user?.user_id;

        //Creating object for store answers in DB
        const resultObject = {
            user_id: userId,
            answers: reqBody.request
        }

        return await this.answersRepository.createAnswers(resultObject);
    }

    async submitAnswer(email: string, reqBody: any): Promise<any> {
        const answers = reqBody;
        let filter;
        if (!answers.role || answers.role === null || answers.role === undefined) {
            answers.role = 'user'
        }

        //get userID against user email
        const user = await this.userService.findUserByEmail(email);
        const userId: string | undefined = user?.user_id;
        answers.user_id = userId;

        //TODO it is only for he time we need to remove this check when we will change it on web side
        if (answers.questionId) {
            filter =  {user_id: userId, question_id: answers.questionId, role: answers.role}
        } else {
            filter = {user_id: userId, type: answers.type, role: answers.role}
        }

        return await this.answersRepository.findOneAndUpdate(filter, answers, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async fetchAnswers(email: string, role: string | undefined): Promise<any> {
        //get userID against user email
        let userRole;
        const user = await this.userService.findUserByEmail(email);
        const userId: string | undefined = user?.user_id;

        if (!role) {
            userRole = 'user'
        } else {
            userRole = role
        }

        return await this.answersRepository.findAnswers(userId, userRole);
    }

    async deleteAnswers(filter: object): Promise<any> {
        return await this.answersRepository.deleteAnswers(filter);
    }

    async updateUserAssessmentCheck(email: string, role: string | undefined): Promise<any> {
        //get userID against user email
        let userRole;
        const user = await this.userService.findUserByEmail(email);
        const userId: string | undefined = user?.user_id;

        if (!role) {
            userRole = 'user'
        } else {
            userRole = role
        }

        return await this.answersRepository.findAnswers(userId, userRole);
    }
}
