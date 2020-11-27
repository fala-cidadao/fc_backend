import { Test, TestingModule } from '@nestjs/testing';
import { ProblemModule } from './problem.module';
import { ProblemService } from './problem.service';
import { Types } from 'mongoose';

describe('ProblemService', () => {
  let provider: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProblemModule],
    }).compile();

    provider = module.get<ProblemService>(ProblemService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  /**
   * testa se o problema é criado corretamente
   */
  /**describe('Create Problem', () => {
    const location = {
      latitude: "-7.214888178966554",
          longitude: "-35.90943932477528"
    }
    it('problem should be created', async () => {
      const problem = await provider.createProblem({
        status: "Em andamento",
        adminImages: [],
        userImages: [
          "https://s.glbimg.com/jo/g1/f/original/2011/12/27/santana1.jpg"
        ],
        _id: "5fbdbc688f049f1c66d7f4dd",
        owner: Types.ObjectId("5fa73d6696dd081d89e45862"),
        location: {
          latitude: "-7.214888178966554",
          longitude: "-35.90943932477528"
        },
        description: "ONDE OS JACARE VAO FICAR EIN?",
        title: "KD O LAGUINHO??",
        category: "health",
        comments: [],
        createdAt: "2020-11-25T02:07:36.092Z",
        updatedAt: "2020-11-25T02:07:36.092Z",
        __v: 0
      })
      expect(problem).toMatchObject({
        status: "Em andamento",
        adminImages: [],
        userImages: [
          "https://s.glbimg.com/jo/g1/f/original/2011/12/27/santana1.jpg"
        ],
        _id: "5fbdbc688f049f1c66d7f4dd",
        owner: "5fa73d6696dd081d89e45862",
        location: {
          latitude: "-7.214888178966554",
          longitude: "-35.90943932477528"
        },
        description: "ONDE OS JACARE VAO FICAR EIN?",
        title: "KD O LAGUINHO??",
        category: "health",
        comments: [],
        createdAt: "2020-11-25T02:07:36.092Z",
        updatedAt: "2020-11-25T02:07:36.092Z",
        __v: 0
      })

    });
  });
  */
  /**
   * testa se retorna um array dos problemas
   */
  describe('getAllProblems must return an array', () => {
    it('getAllProblems must return an array"', async () => {
      const problems = await provider.getAllProblems
      console.log(problems);
      expect(problems).toBeInstanceOf(Array);
    });
  });
  /**
   * testa se retorna um array dos problemas filtrado corretamente
   */
  describe('must return an array filtered by its filter', () => {
    it('must return an array filtered by its filter', async () => {
      const problems = await provider.getProblemsByFilter("status")
      expect(problems).toBeInstanceOf(Array);
    });
  });
  /**
   */
  describe('must return an array filtered by its status', () => {
    it('must return an array filtered by its status', async () => {
      const problems = await provider.getProblemsByStatus("Em andamento")
      expect(problems).toBeInstanceOf(Array);
    });
  });
  /**
   * testa se retorna um array dos elementos filtrado corretamente
   */
  describe('must return an array filtered by category', () => {
    it('must return an array filtered by category', async () => {
      const problems = await provider.getProblemsByCategory("health")
      expect(problems).toBeInstanceOf(Array);
    });
  });
  /**
   * testa se retorna um problema pelo seu id
   */
  describe('must return a problem by its id', () => {
    it('must return a problem by its id', async () => {
      const problem = await provider.getProblem("5fbdbc688f049f1c66d7f4dd");
      expect(problem).toMatchObject({
        status: "Em andamento",
        adminImages: [],
        userImages: [
          "https://s.glbimg.com/jo/g1/f/original/2011/12/27/santana1.jpg"
        ],
        _id: "5fbdbc688f049f1c66d7f4dd",
        owner: "5fa73d6696dd081d89e45862",
        location: {
          latitude: "-7.214888178966554",
          longitude: "-35.90943932477528"
        },
        description: "ONDE OS JACARE VAO FICAR EIN?",
        title: "KD O LAGUINHO??",
        category: "health",
        comments: [],
        createdAt: new Date("2020-11-25T02:07:36.092Z"),
        updatedAt: "2020-11-25T02:07:36.092Z",
        __v: 0
      });
    });
  });

});




