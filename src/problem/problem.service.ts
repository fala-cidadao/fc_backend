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

        Logger.log('Listagem bem-sucedida', 'ProblemController');

        return problems;
    }

    public async getProblemsByFilter(filter: string): Promise<Problem[]> {
        if (filter === "category"){
            const problems = await this.getProblemsByCategory(filter);

            Logger.log('Listando por categoria', 'ProblemController');

            return problems;
        } else if (filter === "status"){
            const problems = await this.getProblemsByStatus(filter);

            Logger.log('Listando por status', 'ProblemController');

            return problems;
        } else {
            Logger.error('Filtro não encontrado', 'ProblemService');

            throw new NotFoundException('Filtro não encontrado');
        }
    }

    public async getProblemsByStatus(status: string): Promise<Problem[]> {
        const problems = await this.problemRepository.GetProblemModel.find({ status: status });

        Logger.log('Listagem bem-sucedida', 'ProblemController');

        return problems;
    }

    public async getProblemsByCategory(category: string): Promise<Problem[]> {
        const problems = await this.problemRepository.GetProblemModel.find({ category: category });

        Logger.log('Listagem bem-sucedida', 'ProblemController');

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
        const currentProblem = await this.getProblem(id);

        const updatedProblem = Object.assign(currentProblem, problem)

        return await updatedProblem.save();
    }

    public async comment(id: string, comment: Comment): Promise<Problem> {
        const problem = await this.getProblem(id);

        Logger.log("Adicionando novo comentário ao problema", "problemService");

        problem.comments.push(comment);
        
        return await problem.save();
    }
}
