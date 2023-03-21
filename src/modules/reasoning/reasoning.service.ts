import { Injectable } from '@nestjs/common';
import {ReasoningRepository} from '@/modules/reasoning/reasoning.repository';

@Injectable()
export class ReasoningService {
    constructor(private readonly reasoningRepository: ReasoningRepository) {}

    async findOneAndUpdate(filter: any, data: any): Promise<object | null> {
        return  this.reasoningRepository.findOneAndUpdate(filter, data, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async findReasoning(): Promise<any> {
        return  this.reasoningRepository.fetchAllReasoning();
    }
}
