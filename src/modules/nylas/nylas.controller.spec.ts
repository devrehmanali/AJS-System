import { Test, TestingModule } from '@nestjs/testing';
import { NylasController } from './nylas.controller';

describe('NylasController', () => {
  let controller: NylasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NylasController],
    }).compile();

    controller = module.get<NylasController>(NylasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
