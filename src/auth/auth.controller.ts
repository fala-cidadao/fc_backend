import { Controller, Body, Post, HttpCode, Logger, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './../interfaces/login-dto.interface';
import { LoginResponse } from './../interfaces/login-response.interface';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    public async login(@Body() body: LoginDto, @Res() res): Promise<LoginResponse> {
        try {
            Logger.log('Fazendo login', 'AuthController');

            const connected = await this.authService.login(body);

            Logger.log('Login realizado', 'AuthController');

            return res.status(HttpStatus.OK).json(connected);
        } catch (error) {
            Logger.error(error);

            res.status(HttpStatus.UNAUTHORIZED);

            return error;
        }
    }

    @Post('forgot')
    public async forgotPassword(@Body() body: {email: string}, @Res() res): Promise<LoginResponse> {
        try {
            Logger.log('Solicitando recuperação de senha', 'AuthController');

            await this.authService.recoverPassword(body);

            Logger.log('Email enviado', 'AuthController');

            return res.status(HttpStatus.OK).send();
        } catch (error) {
            Logger.error(error);

            res.status(HttpStatus.UNAUTHORIZED);

            return error;
        }
    };
}
