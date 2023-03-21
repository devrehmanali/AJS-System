import {Get, Module} from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import {FollowRequestService} from '@/modules/follow-request/follow-request.service';
import {SessionsService} from '@/modules/sessions/sessions.service';
import {ViewsService} from '@/modules/views/views.service';

@Module({
  controllers: [HealthCheckController]
})
export class HealthCheckModule {
}
