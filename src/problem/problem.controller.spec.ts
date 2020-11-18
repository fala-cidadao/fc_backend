import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { ProblemModule } from './problem.module';

describe('ProblemController', () => {
  let controller: ProblemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProblemModule],
    }).compile();

    controller = module.get<ProblemController>(ProblemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
