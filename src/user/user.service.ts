import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { User } from '../database/schemas/user.schema';
import { UserDto } from '../interfaces/user.interface'

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async createUser(user: UserDto): Promise<User> {
        const newUser = new this.userRepository.GetUserModel(user);
        try{
            return await newUser.save();
        } catch(e) {
            throw new BadRequestException("User email already exists")
        }

    };

    public async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.GetUserModel.find();

        Logger.log('Listagem bem-sucedida', 'UserController');

        return users;
    };

    public async getUser(id: string): Promise<User> {
        const user = await this.userRepository.GetUserModel.findById(id);

        if (!user) {
            Logger.error('Usuário não encontrado', 'UserService');

            throw new NotFoundException('Usuário não encontrado');
        };

        return user;
    };

    public async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.GetUserModel.find({ email });

        if (user.length === 0) {
            Logger.error('Usuário não encontrado', 'UserService');

            throw new NotFoundException('Usuário não encontrado');
        };

        return user[0];
    }

    public async updateUser(id: string, user: User): Promise<User> {
        const currentUser = await this.getUser(id);

        const updatedUser = Object.assign(currentUser, user)

        return await updatedUser.save();
    }

    public async deleteUser(id: string): Promise<unknown>{
        const user = await this.userRepository.GetUserModel.findById(id);

        if (!user) {
            Logger.error('Usuário não encontrado', 'UserService');

            throw new NotFoundException('Usuário não encontrado');
        };

        return this.userRepository.GetUserModel.deleteOne({_id: id})
    }
};
