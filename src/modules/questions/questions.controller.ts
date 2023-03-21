import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QuestionsService } from '@/modules/questions/questions.service';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {DATA_FOUND, DATA_NOT_FOUND} from "@/constants/constants";

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        status: 200,
        message: "message",
        data: [{
          id: 'string',
          questions: 'string',
          description: 'string',
          options: [],
        },]
      },
    },
    description: '200, returns all questions',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: 'Token has been expired',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: 'InternalServerError',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchUsersQuestions(): Promise<object | undefined> {
    let res = {
      status: 200,
      message: DATA_NOT_FOUND,
      data: {}
    }
    const questions = await this.questionService.fetchUsersQuestions();
    if (questions) {
      res.data = questions;
      res.message = DATA_FOUND;
    } else {
      res.status = 500;
    }
    return res
  }

  // @ApiOkResponse({
  //   schema: {
  //     type: 'object',
  //     example: {
  //       id: 'string',
  //       questions: 'string',
  //       description: 'string',
  //       options: [],
  //       type: 'string',
  //       version: 'string',
  //     },
  //   },
  //   description: '200, returns specific question against id',
  // })
  // @ApiUnauthorizedResponse({
  //   schema: {
  //     type: 'object',
  //     example: {
  //       message: 'string',
  //     },
  //   },
  //   description: 'Token has been expired',
  // })
  // @ApiInternalServerErrorResponse({
  //   schema: {
  //     type: 'object',
  //     example: {
  //       message: 'string',
  //       details: {},
  //     },
  //   },
  //   description: 'InternalServerError',
  // })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Get('/:question_id')
  // async findUserByQuestionId(
  //   @Param('question_id') questionId: string,
  // ): Promise<string> {
  //   return this.questionService.findUserByQuestionId(questionId);
  // }

  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        status: 200,
        message: "message",
        data: [{
          id: 'string',
          questions: 'string',
          description: 'string',
          options: [],
        },]
      },
    },
    description: '200, returns all questions',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: 'Token has been expired',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: 'InternalServerError',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('coach-questions')
  async fetchCoachQuestions(): Promise<object | undefined> {
    let res = {
      status: 200,
      message: DATA_NOT_FOUND,
      data: []
    }
    const questions = await this.questionService.fetchCoachQuestions();
    // @ts-ignore
    if (questions.length > 0) {
      res.data = questions;
      res.message = DATA_FOUND;
    } else {
      res.status = 200;
    }
    return res
  }
}
