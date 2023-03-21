import { Module } from '@nestjs/common';
import { ReasoningController } from './reasoning.controller';
import { ReasoningService } from './reasoning.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Reasoning, ReasoningSchema} from '@/modules/reasoning/schemas/reasoning.schema';
import {ReasoningRepository} from '@/modules/reasoning/reasoning.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reasoning.name, schema: ReasoningSchema }]),
  ],
  controllers: [ReasoningController],
  providers: [ReasoningService, ReasoningRepository],
  exports: [ReasoningService]
})
export class ReasoningModule {}
