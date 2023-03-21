import {Controller, Get} from '@nestjs/common';
import {FollowRequestService} from '@/modules/follow-request/follow-request.service';
import {SessionsService} from '@/modules/sessions/sessions.service';
import {ViewsService} from '@/modules/views/views.service';

@Controller('health-check')
export class HealthCheckController {
    constructor() {
    }
    @Get()
    async healthCheck() {
        return 'healthcheck pass'
    }
}
