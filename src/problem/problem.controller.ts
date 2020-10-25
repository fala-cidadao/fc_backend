import { Controller, Post, Res, Body, Logger, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { Problem } from '../database/schemas/problem.schema';
import { Comment } from '../database/schemas/comment.schema';

@Controller('problem')
export class ProblemController {
    constructor(private readonly problemService: ProblemService) {}

    @Post()
    public async create(@Res() res, @Body() problem): Promise<Problem> {
        try {
            Logger.log("Criando novo problema", "ProblemController");

            const newProblem = await this.problemService.createProblem(problem);

            Logger.log("Novo problema criado", "ProblemController");

            return res.status(HttpStatus.OK).json(newProblem);
        } catch (error) {
            Logger.error("Erro ao tentar criar um novo problema", "", "ProblemController");

            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get()
    public async getAllProblems(@Res() res): Promise<Problem> {
        try {
            Logger.log("Iniciando listagem de problemas", "ProblemController");

            const problems = await this.problemService.getAllProblems();

            return res.status(HttpStatus.OK).json(problems);
        } catch (error) {
            Logger.error("Erro ao tentar listar problemas", "", "ProblemController");

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Get(':id')
    public async getProblem(@Res() res, @Param('id') id: string): Promise<Problem> {
        Logger.log('Buscando problema por id', 'ProblemController');
        
        const problem = await this.problemService.getProblem(id);

        return res.status(HttpStatus.OK).json(problem);
    }

    @Put(':id')
    public async update(@Res() res, @Param('id') id: string, @Body() problem: Problem): Promise<Problem> {
        Logger.log('Atualizando problema', 'ProblemController');

        const problemUpdated = await this.problemService.updateProblem(id, problem);

        return res.status(HttpStatus.OK).json(problemUpdated);
    }

    @Post(':id/comment')
    public async comment(@Res() res, @Param('id') id: string, @Body() comment: Comment): Promise<Problem> {
        const problem = await this.problemService.comment(id, comment);

        res.status(HttpStatus.OK).json(problem);

        Logger.log("Problema atualizado - Method: comment", "problemController");

        return problem;
    }

}
