import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { User } from '../database/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async createUser(user: User): Promise<User> {
        const newUser = new this.userRepository.GetUserModel(user);

        return await newUser.save();
    };

    public async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.GetUserModel.find();

        if (!users || users.length === 0) {
            Logger.warn('Nenhum usuário cadastrado', 'UserService');

            throw new NotFoundException('Nenhum usuário cadastrado');
        } else {
            Logger.log('Listagem bem-sucedida', 'UserController');
        }

        return users;
    };

    public async getUser(id: string): Promise<User> {
        const user = await this.userRepository.GetUserModel.findById(id);

        if (!user) {
            Logger.error('Usuário não encontrado', 'UserService');

            throw new NotFoundException('Usuário não encontrado');
        };

        return user;
    }
};
