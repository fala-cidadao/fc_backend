import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProblemRepository } from '../database/repositories/problem.repository';
import { Problem } from '../database/schemas/problem.schema';
import { Comment } from '../database/schemas/comment.schema';

@Injectable()
export class ProblemService {
    constructor(private readonly problemRepository: ProblemRepository) {}

    public async createProblem(problem: Problem): Promise<Problem> {
        const newProblem = new this.problemRepository.GetProblemModel(problem);

        return await newProblem.save();
    };

    public async getAllProblems(): Promise<Problem[]> {
        const problems = await this.problemRepository.GetProblemModel.find();

        if (!problems || problems.length === 0) {
            Logger.warn('Nenhum problema cadastrado', 'ProblemService');

            return problems
        } else {
            Logger.log('Listagem bem-sucedida', 'ProblemController');
        }

        return problems;
    }

    public async getProblem(id: string): Promise<Problem> {
        const problem = await this.problemRepository.GetProblemModel.findById(id);

        if (!problem) {
            Logger.error('Problema não encontrado', 'ProblemService');

            throw new NotFoundException('Problema não encontrado');
        };

        return problem;
    }

    public async updateProblem(id: string, problem: Problem): Promise<Problem> {
        const problemSearch = await this.getProblem(id);

        await this.problemRepository.GetProblemModel.updateOne({ id: id }, problemSearch);

        return problemSearch;
    }

    public async comment(id: string, comment: Comment): Promise<Problem> {
        const problem = await this.getProblem(id);

        Logger.log("Adicionando novo comentário ao problema", "problemService");

        problem.comments.push(comment);

        await this.problemRepository.GetProblemModel.updateOne({ id: id }, problem);

        return problem;
    }
}
