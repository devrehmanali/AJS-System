import { Test, TestingModule } from '@nestjs/testing';
import { ReasoningController } from './reasoning.controller';

describe('ReasoningController', () => {
  let controller: ReasoningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReasoningController],
    }).compile();

    controller = module.get<ReasoningController>(ReasoningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
