import { ModelDefinition } from '@nestjs/mongoose';
import { UserSchema, UserSchemaProvide } from './schemas/user.schema';
import { ProblemSchema, ProblemSchemaProvide } from './schemas/problem.schema';

export const modelsProvider: ModelDefinition[] = [
    {
        name: UserSchemaProvide,
        schema: UserSchema,
        collection: 'users'
    },
    {
        name: ProblemSchemaProvide,
        schema: ProblemSchema,
        collection: 'problems'
    }
];