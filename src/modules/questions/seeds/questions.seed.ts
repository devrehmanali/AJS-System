import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { QuestionsService } from '../questions.service';

@Injectable()
export class QuestionsSeed {
  constructor(private readonly questionService: QuestionsService) {}

  @Command({
    command: 'create:questions',
    describe: 'create questions',
  })
  async create(): Promise<string | void> {
    //User questions
    const question_1 = await this.questionService.create({
      questions:
        'Please describe yourself using the 35 characteristics: "That\'s me"',
      description:
        'In each of the five rows (across) give a 1 for the quality that best describes you, a 2 for the second best and a 3 that describes you third best.',
      options: [
        [
          {
            opt: 'Introspective',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Imaginative',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Empathic',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Conscientious',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Spontaneous',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Energetic',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Self-confident',
            isSelected: false,
            count: 0,
          },
        ],
        [
          {
            opt: 'Reflective',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Inventive',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Helpful',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Responsible',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Generous',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Outgoing',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Strong',
            isSelected: false,
            count: 0,
          },
        ],
        [
          {
            opt: 'Thoughtful',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Curious',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Friendly',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Organized',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Lively',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Active',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Fearless',
            isSelected: false,
            count: 0,
          },
        ],
        [
          {
            opt: 'Deep',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Flexible',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Warmhearted',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Systematic',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Cheerful',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Optimistic',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Vigorous',
            isSelected: false,
            count: 0,
          },
        ],
        [
          {
            opt: 'Complex',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Creative',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Generous1',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Practical',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Talkative',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Assertive',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Impulsive',
            isSelected: false,
            count: 0,
          },
        ],
      ],
      type: 'personality assurance',
      role: 'user',
    });

    const question_2 = await this.questionService.create({
      questions: 'Which of the 5 colors card appeals to you the most?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+A.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+B.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+C.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+D.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+E.png',
          isSelected: false,
        },
      ],

      type: 'image picking',
      role: 'user',
    });

    const question_3 = await this.questionService.create({
      questions: 'Which of the 5 colors card appeals to you the most?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+F.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+G.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+H.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+I.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+J.png',
          isSelected: false,
        },
      ],
      type: 'image picking',
      role: 'user',
    });

    const question_4 = await this.questionService.create({
      questions:
        'Please mark a cell that the best describes, how you a ideally want to feel, if you are now looking for a change in your experience',
      options: [
        {
          feelings: [
            'Strong Self-determined',
            'Stimulated Aroused',
            'Energetic Active',
            'Open Outward',
            'Serenely Carefree',
            'Relaxed Calm',
            'Secured Protected',
            'Introspective Inside',
          ],
        },
        {
          feelingsBoxColors: [
            { id: 1, color: '#737373', isSelected: false },
            { id: 2, color: '#999999', isSelected: false },
            { id: 3, color: '#BFBFBF', isSelected: false },
            { id: 4, color: '#999999', isSelected: false },
            { id: 5, color: '#737373', isSelected: false },
            { id: 6, color: '#999999', isSelected: false },
            { id: 7, color: '#BFBFBF', isSelected: false },
            { id: 8, color: '#999999', isSelected: false },
            { id: 9, color: '#737373', isSelected: false },
            { id: 10, color: '#999999', isSelected: false },
            { id: 11, color: '#999999', isSelected: false },
            { id: 12, color: '#BFBFBF', isSelected: false },
            { id: 13, color: '#999999', isSelected: false },
            { id: 14, color: '#999999', isSelected: false },
            { id: 15, color: '#999999', isSelected: false },
            { id: 16, color: '#BFBFBF', isSelected: false },
            { id: 17, color: '#999999', isSelected: false },
            { id: 18, color: '#999999', isSelected: false },
            { id: 19, color: '#BFBFBF', isSelected: false },
            { id: 20, color: '#BFBFBF', isSelected: false },
            { id: 21, color: '#BFBFBF', isSelected: false },
            { id: 22, color: '#BFBFBF', isSelected: false },
            { id: 23, color: '#BFBFBF', isSelected: false },
            { id: 24, color: '#BFBFBF', isSelected: false },
            { id: 25, color: '#BFBFBF', isSelected: false },
            { id: 26, color: '#BFBFBF', isSelected: false },
            { id: 27, color: '#BFBFBF', isSelected: false },
            { id: 28, color: '#999999', isSelected: false },
            { id: 29, color: '#999999', isSelected: false },
            { id: 30, color: '#BFBFBF', isSelected: false },
            { id: 31, color: '#E5E5E5', isSelected: false },
            { id: 32, color: '#E5E5E5', isSelected: false },
            { id: 33, color: '#E5E5E5', isSelected: false },
            { id: 34, color: '#BFBFBF', isSelected: false },
            { id: 35, color: '#999999', isSelected: false },
            { id: 36, color: '#999999', isSelected: false },
            { id: 37, color: '#737373', isSelected: false },
            { id: 38, color: '#999999', isSelected: false },
            { id: 39, color: '#BFBFBF', isSelected: false },
            { id: 40, color: '#E5E5E5', isSelected: false },
            { id: 41, color: '#FFFFFF', isSelected: false },
            { id: 42, color: '#E5E5E5', isSelected: false },
            { id: 43, color: '#BFBFBF', isSelected: false },
            { id: 44, color: '#999999', isSelected: false },
            { id: 45, color: '#737373', isSelected: false },
            { id: 46, color: '#999999', isSelected: false },
            { id: 47, color: '#999999', isSelected: false },
            { id: 48, color: '#BFBFBF', isSelected: false },
            { id: 49, color: '#E5E5E5', isSelected: false },
            { id: 50, color: '#E5E5E5', isSelected: false },
            { id: 51, color: '#E5E5E5', isSelected: false },
            { id: 52, color: '#BFBFBF', isSelected: false },
            { id: 53, color: '#999999', isSelected: false },
            { id: 54, color: '#999999', isSelected: false },
            { id: 55, color: '#BFBFBF', isSelected: false },
            { id: 56, color: '#BFBFBF', isSelected: false },
            { id: 57, color: '#BFBFBF', isSelected: false },
            { id: 58, color: '#BFBFBF', isSelected: false },
            { id: 59, color: '#BFBFBF', isSelected: false },
            { id: 60, color: '#BFBFBF', isSelected: false },
            { id: 61, color: '#BFBFBF', isSelected: false },
            { id: 62, color: '#BFBFBF', isSelected: false },
            { id: 63, color: '#BFBFBF', isSelected: false },
            { id: 64, color: '#999999', isSelected: false },
            { id: 65, color: '#999999', isSelected: false },
            { id: 66, color: '#BFBFBF', isSelected: false },
            { id: 67, color: '#999999', isSelected: false },
            { id: 68, color: '#999999', isSelected: false },
            { id: 69, color: '#999999', isSelected: false },
            { id: 70, color: '#BFBFBF', isSelected: false },
            { id: 71, color: '#999999', isSelected: false },
            { id: 72, color: '#999999', isSelected: false },
            { id: 73, color: '#737373', isSelected: false },
            { id: 74, color: '#999999', isSelected: false },
            { id: 75, color: '#BFBFBF', isSelected: false },
            { id: 76, color: '#999999', isSelected: false },
            { id: 77, color: '#737373', isSelected: false },
            { id: 78, color: '#999999', isSelected: false },
            { id: 79, color: '#BFBFBF', isSelected: false },
            { id: 80, color: '#999999', isSelected: false },
            { id: 81, color: '#737373', isSelected: false },
          ],
        },
      ],
      type: 'matrix 9 by 9',
      role: 'user',
    });

    const question_5 = await this.questionService.create({
      questions:
        'Please mark a cell that the best describes how you a ideally want to feel if you are now looking for a change in your experience',
      options: [
        {
          feelings: [
            'Strong Self-determined',
            'Stimulated Aroused',
            'Energetic Active',
            'Open Outward',
            'Serenely Carefree',
            'Relaxed Calm',
            'Secured Protected',
            'Introspective Inside',
          ],
        },
        {
          feelingsBoxColors: [
            { id: 1, color: '#737373', isSelected: false },
            { id: 2, color: '#999999', isSelected: false },
            { id: 3, color: '#BFBFBF', isSelected: false },
            { id: 4, color: '#999999', isSelected: false },
            { id: 5, color: '#737373', isSelected: false },
            { id: 6, color: '#999999', isSelected: false },
            { id: 7, color: '#BFBFBF', isSelected: false },
            { id: 8, color: '#999999', isSelected: false },
            { id: 9, color: '#737373', isSelected: false },
            { id: 10, color: '#999999', isSelected: false },
            { id: 11, color: '#999999', isSelected: false },
            { id: 12, color: '#BFBFBF', isSelected: false },
            { id: 13, color: '#999999', isSelected: false },
            { id: 14, color: '#999999', isSelected: false },
            { id: 15, color: '#999999', isSelected: false },
            { id: 16, color: '#BFBFBF', isSelected: false },
            { id: 17, color: '#999999', isSelected: false },
            { id: 18, color: '#999999', isSelected: false },
            { id: 19, color: '#BFBFBF', isSelected: false },
            { id: 20, color: '#BFBFBF', isSelected: false },
            { id: 21, color: '#BFBFBF', isSelected: false },
            { id: 22, color: '#BFBFBF', isSelected: false },
            { id: 23, color: '#BFBFBF', isSelected: false },
            { id: 24, color: '#BFBFBF', isSelected: false },
            { id: 25, color: '#BFBFBF', isSelected: false },
            { id: 26, color: '#BFBFBF', isSelected: false },
            { id: 27, color: '#BFBFBF', isSelected: false },
            { id: 28, color: '#999999', isSelected: false },
            { id: 29, color: '#999999', isSelected: false },
            { id: 30, color: '#BFBFBF', isSelected: false },
            { id: 31, color: '#E5E5E5', isSelected: false },
            { id: 32, color: '#E5E5E5', isSelected: false },
            { id: 33, color: '#E5E5E5', isSelected: false },
            { id: 34, color: '#BFBFBF', isSelected: false },
            { id: 35, color: '#999999', isSelected: false },
            { id: 36, color: '#999999', isSelected: false },
            { id: 37, color: '#737373', isSelected: false },
            { id: 38, color: '#999999', isSelected: false },
            { id: 39, color: '#BFBFBF', isSelected: false },
            { id: 40, color: '#E5E5E5', isSelected: false },
            { id: 41, color: '#FFFFFF', isSelected: false },
            { id: 42, color: '#E5E5E5', isSelected: false },
            { id: 43, color: '#BFBFBF', isSelected: false },
            { id: 44, color: '#999999', isSelected: false },
            { id: 45, color: '#737373', isSelected: false },
            { id: 46, color: '#999999', isSelected: false },
            { id: 47, color: '#999999', isSelected: false },
            { id: 48, color: '#BFBFBF', isSelected: false },
            { id: 49, color: '#E5E5E5', isSelected: false },
            { id: 50, color: '#E5E5E5', isSelected: false },
            { id: 51, color: '#E5E5E5', isSelected: false },
            { id: 52, color: '#BFBFBF', isSelected: false },
            { id: 53, color: '#999999', isSelected: false },
            { id: 54, color: '#999999', isSelected: false },
            { id: 55, color: '#BFBFBF', isSelected: false },
            { id: 56, color: '#BFBFBF', isSelected: false },
            { id: 57, color: '#BFBFBF', isSelected: false },
            { id: 58, color: '#BFBFBF', isSelected: false },
            { id: 59, color: '#BFBFBF', isSelected: false },
            { id: 60, color: '#BFBFBF', isSelected: false },
            { id: 61, color: '#BFBFBF', isSelected: false },
            { id: 62, color: '#BFBFBF', isSelected: false },
            { id: 63, color: '#BFBFBF', isSelected: false },
            { id: 64, color: '#999999', isSelected: false },
            { id: 65, color: '#999999', isSelected: false },
            { id: 66, color: '#BFBFBF', isSelected: false },
            { id: 67, color: '#999999', isSelected: false },
            { id: 68, color: '#999999', isSelected: false },
            { id: 69, color: '#999999', isSelected: false },
            { id: 70, color: '#BFBFBF', isSelected: false },
            { id: 71, color: '#999999', isSelected: false },
            { id: 72, color: '#999999', isSelected: false },
            { id: 73, color: '#737373', isSelected: false },
            { id: 74, color: '#999999', isSelected: false },
            { id: 75, color: '#BFBFBF', isSelected: false },
            { id: 76, color: '#999999', isSelected: false },
            { id: 77, color: '#737373', isSelected: false },
            { id: 78, color: '#999999', isSelected: false },
            { id: 79, color: '#BFBFBF', isSelected: false },
            { id: 80, color: '#999999', isSelected: false },
            { id: 81, color: '#737373', isSelected: false },
          ],
        },
      ],
      type: 'matrix 9 by 9',
      role: 'user',
    });

    const question_6 = await this.questionService.create({
      questions: 'Which color block attracts you the most?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+H.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+A.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+B.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+G.png',
          isSelected: false,
        },
        { id: 5, img: '', isSelected: false },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+C.png',
          isSelected: false,
        },
        {
          id: 7,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+F.png',
          isSelected: false,
        },
        {
          id: 8,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+E.png',
          isSelected: false,
        },
        {
          id: 9,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+D.png',
          isSelected: false,
        },
      ],
      type: 'matrix 3 by 3',
      role: 'user',
    });

    const question_7 = await this.questionService.create({
      questions: 'Which color block attracts you the most?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+H.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+A.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+B.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+G.png',
          isSelected: false,
        },
        { id: 5, img: '', isSelected: false },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+C.png',
          isSelected: false,
        },
        {
          id: 7,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+F.png',
          isSelected: false,
        },
        {
          id: 8,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+E.png',
          isSelected: false,
        },
        {
          id: 9,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Colorblocks+TS_Block+D.png',
          isSelected: false,
        },
      ],
      type: 'matrix 3 by 3',
      role: 'user',
    });

    const question_8 = await this.questionService.create({
      questions: 'Which of the five MOODFORMS speaks to you the most now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+6.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+7.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+8.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+9.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+10.png',
          isSelected: false,
        },
      ],
      type: 'image picking',
      role: 'user',
    });

    const question_9 = await this.questionService.create({
      questions: 'Which of the five MOODFORMS speaks to you the most now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+6.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+7.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+8.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+9.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+10.png',
          isSelected: false,
        },
      ],
      type: 'image picking',
      role: 'user',
    });

    const question_10 = await this.questionService.create({
      questions:
        'Which of the six color forms speaks to you the most right now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+6.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+14.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+13.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+12.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+11.png',
          isSelected: false,
        },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+10.png',
          isSelected: false,
        },
      ],
      type: 'selection with dropdown',
      role: 'user',
    });

    const question_11 = await this.questionService.create({
      questions:
        'Find a second color form that also appeals to you. You can also choose the same color form twice.',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+6.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+14.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+13.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+12.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+11.png',
          isSelected: false,
        },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+10.png',
          isSelected: false,
        },
      ],
      type: 'selection with dropdown',
      role: 'user',
    });

    const question_12 = await this.questionService.create({
      questions:
        'Which of the six dash patterns speaks to you the most right now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+1.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+2.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+3.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+4.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+5.png',
          isSelected: false,
        },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+6.png',
          isSelected: false,
        },
      ],
      type: 'coach finding',
      role: 'user',
    });

    const question_13 = await this.questionService.create({
      questions: 'Click on a second symbol that you like as well',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+1.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+2.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+3.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+4.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+5.png',
          isSelected: false,
        },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+6.png',
          isSelected: false,
        },
      ],
      type: 'coach finding',
      role: 'user',
    });

    //Coach questions

    const coach_question_1 = await this.questionService.create({
      questions: 'Which of the 5 colors card appeals to you the most?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+A.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+B.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+C.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+D.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+TrueSelf+ColorCards_ColorCard+E.png',
          isSelected: false,
        },
      ],
      type: 'image picking',
      role: 'coach',
    });

    // const coach_question_2 = await this.questionService.create({
    //   questions: 'Which of the 5 colors card appeals to you the most?',
    //   options: [
    //     {
    //       id: 1,
    //       img: 'q2_image_248.png',
    //       isSelected: false
    //     },
    //     {
    //       id: 2,
    //       img: 'q2_image_249.png',
    //       isSelected: false
    //     },
    //     {
    //       id: 3,
    //       img: 'q2_image_250.png',
    //       isSelected: false
    //     },
    //     {
    //       id: 4,
    //       img: 'q2_image_251.png',
    //       isSelected: false
    //     },
    //     {
    //       id: 5,
    //       img: 'q2_image_252.png',
    //       isSelected: false
    //     }
    //   ],
    //   type: 'image picking',
    //   role: 'coach'
    // });

    const coach_question_3 = await this.questionService.create({
      questions:
        'Which of the five black and white shapes speaks to you the most?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+1.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+2.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+3.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+4.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+5.png',
          isSelected: false,
        },
      ],
      type: 'image picking',
      role: 'coach',
    });

    // const coach_question_4 = await this.questionService.create({
    //   questions: 'Which of the five black and white shapes speaks to you the most?',
    //   options: [
    //     {
    //       id: 1,
    //       img: 'coach_q3_img_1.png',
    //       isSelected: false
    //     },
    //     {
    //       id: 2,
    //       img: 'coach_q3_img_2.png',
    //       isSelected: false
    //     },
    //     {
    //       id: 3,
    //       img: 'coach_q3_img_3.png',
    //       isSelected: false
    //     },
    //     {
    //       id: 4,
    //       img: 'coach_q3_img_4.png',
    //       isSelected: false
    //     },
    //     {
    //       id: 5,
    //       img: 'coach_q3_img_5.png',
    //       isSelected: false
    //     }
    //   ],
    //   type: 'image picking',
    //   role: 'coach'
    // });

    const coach_question_5 = await this.questionService.create({
      questions:
        'Click on the column with the most attractive color groups for you.',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+1.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+2.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+3.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+4.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+5.png',
          isSelected: false,
        },
      ],
      type: 'image picking',
      role: 'coach',
    });

    const coach_question_6 = await this.questionService.create({
      questions:
        'Click on the column with the most attractive color groups for you.',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+1.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+2.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+3.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+4.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/TS+Color+Columns_TS+Color+Column+5.png',
          isSelected: false,
        },
      ],
      type: 'image picking',
      role: 'coach',
    });

    const coach_question_7 = await this.questionService.create({
      questions:
        'Please describe yourself using the 35 characteristics: "That\'s me"',
      description:
        'In each of the five rows (across) give a 1 for the quality that best describes you, a 2 for the second best and a 3 that describes you third best.',
      options: [
        [
          {
            opt: 'Introspective',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Imaginative',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Empathic',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Conscientious',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Spontaneous',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Energetic',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Self-confident',
            isSelected: false,
            count: 0,
          },
        ],
        [
          {
            opt: 'Reflective',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Inventive',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Helpful',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Responsible',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Generous',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Outgoing',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Strong',
            isSelected: false,
            count: 0,
          },
        ],
        [
          {
            opt: 'Thoughtful',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Curious',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Friendly',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Organized',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Lively',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Active',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Fearless',
            isSelected: false,
            count: 0,
          },
        ],
        [
          {
            opt: 'Deep',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Flexible',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Warmhearted',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Systematic',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Cheerful',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Optimistic',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Vigorous',
            isSelected: false,
            count: 0,
          },
        ],
        [
          {
            opt: 'Complex',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Creative',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Generous1',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Practical',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Talkative',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Assertive',
            isSelected: false,
            count: 0,
          },
          {
            opt: 'Impulsive',
            isSelected: false,
            count: 0,
          },
        ],
      ],
      type: 'personality assurance',
      role: 'coach',
    });

    const coach_question_8 = await this.questionService.create({
      questions: 'Which of the five MOODFORMS speaks to you the most now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+6.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+7.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+8.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+9.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+10.png',
          isSelected: false,
        },
      ],
      type: 'image picking',
      role: 'coach',
    });

    const coach_question_9 = await this.questionService.create({
      questions: 'Which of the five MOODFORMS speaks to you the most now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+6.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+7.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+8.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+9.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+10.png',
          isSelected: false,
        },
      ],
      type: 'image picking',
      role: 'coach',
    });

    const coach_question_10 = await this.questionService.create({
      questions:
        'Which of the six dash patterns speaks to you the most right now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+1.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+2.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+3.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+4.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+5.png',
          isSelected: false,
        },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+6.png',
          isSelected: false,
        },
      ],
      type: 'coach finding',
      role: 'coach',
    });

    const coach_question_11 = await this.questionService.create({
      questions:
        'Which of the six dash patterns speaks to you the most right now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+1.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+2.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+3.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+4.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+5.png',
          isSelected: false,
        },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_LINE+6.png',
          isSelected: false,
        },
      ],
      type: 'coach finding',
      role: 'coach',
    });

    const coach_question_12 = await this.questionService.create({
      questions:
        'Which of the six color forms speaks to you the most right now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+6.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+14.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+13.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+12.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+11.png',
          isSelected: false,
        },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+10.png',
          isSelected: false,
        },
      ],
      type: 'coach finding',
      role: 'coach',
    });

    const coach_question_13 = await this.questionService.create({
      questions:
        'Which of the six color forms speaks to you the most right now?',
      options: [
        {
          id: 1,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+6.png',
          isSelected: false,
        },
        {
          id: 2,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+14.png',
          isSelected: false,
        },
        {
          id: 3,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+13.png',
          isSelected: false,
        },
        {
          id: 4,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+12.png',
          isSelected: false,
        },
        {
          id: 5,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+11.png',
          isSelected: false,
        },
        {
          id: 6,
          img: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/Wellavi+Trueself+Moodforms_MOODFORM+10.png',
          isSelected: false,
        },
      ],
      type: 'coach finding',
      role: 'coach',
    });

    console.log('Seeding Success');
  }
}
