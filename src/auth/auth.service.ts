import { Injectable, UnauthorizedException, Logger, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { UserService } from './../user/user.service';
import { LoginDto } from './../interfaces/login-dto.interface';
import { LoginResponse }  from '../interfaces/login-response.interface';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class AuthService {
    private readonly secret: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly appConfigService: AppConfigService
    ) {
        this.secret = this.appConfigService.secret;
    }

    public async login(user: LoginDto): Promise<LoginResponse> {
        try {
            Logger.log("Buscando usuário para autenticação", "AuthService");
            const userDoc = await this.userService.getUserByEmail(user.email);

            if (!userDoc) throw new BadRequestException('User not found');

            if (!await compare(user.password, userDoc.password)) throw new UnauthorizedException('Invalid credentials');

            Logger.log("Gerando token de login", "AuthService");
            const token = this.jwtService.sign({ id: userDoc._id, email: userDoc.email, role: userDoc.role });

            const response: LoginResponse = {
                auth: true,
                token,
                user: {
                    userId: userDoc._id,
                    name: userDoc.name,
                    email: userDoc.email,
                    phone: userDoc.phone,
                    role: userDoc.role,
                }
            };

            return response;
        } catch (error) {
            Logger.error(error);
            return error;
        }
    };

    async validateToken(token): Promise<any> {
        const result = await verify(token, this.secret, (error, decoded) => {
            if (error) {

                Logger.log("Falha na autenticação", "AuthService");

                return false;
            } else {
                return decoded;
            };
        });
        
        return result;
    }
};
