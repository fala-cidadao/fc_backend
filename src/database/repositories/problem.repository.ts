import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Problem, ProblemSchemaProvide } from '../schemas/problem.schema';

@Injectable()
export class ProblemRepository {
    constructor(@InjectModel(ProblemSchemaProvide) private ProblemModel: Model<Problem>) {};

    public get GetProblemModel(): Model<Problem> {
        return this.ProblemModel;
    };
};