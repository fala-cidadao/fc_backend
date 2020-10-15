import { ModelDefinition, AsyncModelFactory } from '@nestjs/mongoose';
import { User, UserSchema, UserSchemaProvide } from './schemas/user.schema';
import { ProblemSchema, ProblemSchemaProvide } from './schemas/problem.schema';
import * as bcrypt from 'bcrypt';

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

export const modelsProviderAsync: AsyncModelFactory[] = [
    {
        name: UserSchemaProvide,
        collection: 'users',
        useFactory: () => {
            const schema = UserSchema;
            schema.pre<User>('save', async () => {
                const salt: string = await bcrypt.genSalt(5);
                this.password = await bcrypt.hash(this.password, salt);
            });
            return schema;
        }
    }
];