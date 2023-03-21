import { Test, TestingModule } from '@nestjs/testing';
import { WellnessDimensionsController } from './wellness-dimensions.controller';

describe('WellnessDimensionsController', () => {
  let controller: WellnessDimensionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WellnessDimensionsController],
    }).compile();

    controller = module.get<WellnessDimensionsController>(WellnessDimensionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
