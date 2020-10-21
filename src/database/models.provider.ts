import { AsyncModelFactory } from '@nestjs/mongoose';
import { User, UserSchema, UserSchemaProvide } from './schemas/user.schema';
import { ProblemSchema, ProblemSchemaProvide } from './schemas/problem.schema';
import * as bcrypt from 'bcrypt';

export const modelsProviderAsync: AsyncModelFactory[] = [
    {
        name: UserSchemaProvide,
        collection: 'users',
        useFactory: () => {
            const schema = UserSchema;
            schema.pre<User>('save', async function(next) {
                const salt: string = await bcrypt.genSalt(5);
                const hash = await bcrypt.hash(this.password, salt);
                this.password = hash;
                next();
            });
            return schema;
        }
    },
    {
        name: ProblemSchemaProvide,
        collection: 'problems',
        useFactory: () => ProblemSchema
    }
];