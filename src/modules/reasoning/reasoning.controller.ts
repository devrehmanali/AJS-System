import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {JwtAuthGuard} from '@auth/guards/jwt-auth.guard';
import {DATA_FOUND, DATA_NOT_FOUND} from '@/constants/constants';
import {ReasoningService} from '@/modules/reasoning/reasoning.service';

@Controller()
export class ReasoningController {
    constructor(private readonly reasoningService: ReasoningService) {}

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {
                    status: 200,
                    message: DATA_FOUND,
                    data: [
                        {
                            _id: "63fca3c299fd74163fa20cfb",
                            name: "Lack of relevant experience or expertise in the desired coaching niche or industry",
                            __v: 0,
                            createdAt: "2023-02-27T12:36:18.880Z",
                            updatedAt: "2023-02-27T12:36:18.880Z"
                        },
                    ]
                },
        },
        description: '200, Return all reasoning',
    })
    @Get('reasoning')
    async reasoning() {
        const res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: []
        }
        const result = await this.reasoningService.findReasoning();

        if (result.length > 0) {
            res.message = DATA_FOUND;
            res.data = result;
        }
        return res
    }
}
