import { Test, TestingModule } from '@nestjs/testing';
import { NylasService } from './nylas.service';

describe('NylasService', () => {
  let service: NylasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NylasService],
    }).compile();

    service = module.get<NylasService>(NylasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
