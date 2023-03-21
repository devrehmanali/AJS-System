import { Test, TestingModule } from '@nestjs/testing';
import { WellnessDimensionsService } from './wellness-dimensions.service';

describe('WellnessDimensionsService', () => {
  let service: WellnessDimensionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WellnessDimensionsService],
    }).compile();

    service = module.get<WellnessDimensionsService>(WellnessDimensionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
