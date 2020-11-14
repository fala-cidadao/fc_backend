import { Controller, Get, Post, Delete, Body, HttpStatus, Res, Logger, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../database/schemas/user.schema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    public async create(@Res() res, @Body() user): Promise<User> {
        try {
            Logger.log("Criando novo usuário", "UserController");

            const newUser = await this.userService.createUser(user);

            Logger.log("Novo usuário criado", "UserController");

            return res.status(HttpStatus.OK).json(newUser);
        } catch (error) {
            Logger.error("Erro ao tentar criar um novo usuário", "", "UserController");

            return res.status(HttpStatus.BAD_REQUEST).json(error);
        };
    };

    @Get()
    async getAllUsers(@Res() res): Promise<User[]> {
        try {
            Logger.log("Iniciando listagem de usuários", "UserController");

            const users = await this.userService.getAllUsers();

            return res.status(HttpStatus.OK).json(users);
        } catch (error) {
            Logger.error("Erro ao tentar listar usuários", "", "UserController");

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    };

    @Get(':id')
    async getUser(@Res() res, @Param('id') id: string): Promise<User> {
        Logger.log('Buscando usuário por id', 'UserController');
        
        const user = await this.userService.getUser(id);

        return res.status(HttpStatus.OK).json(user);
    }

    @Delete(':id')
    async delete(@Res() res, @Param('id') id: string): Promise<void> {
        Logger.log('Deletando usuário por id', 'UserController');

        await this.userService.deleteUser(id);

        return res.status(HttpStatus.OK).send()
    }
};
