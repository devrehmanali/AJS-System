import { Test, TestingModule } from '@nestjs/testing';
import { ReasoningService } from './reasoning.service';

describe('ReasoningService', () => {
  let service: ReasoningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReasoningService],
    }).compile();

    service = module.get<ReasoningService>(ReasoningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
