import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchemaProvide } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(UserSchemaProvide) private readonly UserModel: Model<User>) {};

    public get GetUserModel(): Model<User> {
        return this.UserModel;
    };
};