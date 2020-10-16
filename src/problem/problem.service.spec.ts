import { Test, TestingModule } from '@nestjs/testing';
import { ProblemService } from './problem.service';

describe('ProblemService', () => {
  let provider: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemService],
    }).compile();

    provider = module.get<ProblemService>(ProblemService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
