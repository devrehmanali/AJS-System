import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {JwtAuthGuard} from '@auth/guards/jwt-auth.guard';

@ApiTags('reviews')
@Controller()
export class ReviewsController {
    constructor() {
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {
                    status: 200,
                    data: [
                        {id: 1, name: "", rating: "",review: "", imageURL: ""}
                    ]
                },
        },
        description: '200, Return all reviews',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                status: 401, message: 'string',
            },
        },
        description: 'Token has been expired',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('my-reviews')
    async reviews() {
        let res = {
            status: 200,
            data: [
                {id: 1, name: "review 1", rating: "5",review: "awesome", imageURL: ""},
                {id: 2, name: "review 2", rating: "1",review: "frustrated", imageURL: ""},
                {id: 3, name: "review 3", rating: "3.4",review: "normal", imageURL: ""}
            ]
        }
        return res
    }

}
