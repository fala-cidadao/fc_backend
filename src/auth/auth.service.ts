  
import { Injectable, UnauthorizedException, Logger, BadRequestException, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';

interface LoginResponse {
    auth: boolean;
    token: string;
    user: {
        userId: string;
        email: string;
        role: string;
    };
}

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    public async login(user): Promise<LoginResponse> {
        Logger.log("Buscando usuário para autenticação", "AuthService");
        const userDoc = user;

        if (!userDoc) throw new BadRequestException('User not found');

        if (!await compare(user.password, userDoc.password)) throw new UnauthorizedException('Invalid credentials');

        Logger.log("Gerando token de login", "AuthService");
        const token = this.jwtService.sign({ id: userDoc._id, email: userDoc.email });
        const response: LoginResponse = {
            auth: true,
            token,
            user: {
                userId: userDoc._id,
                email: userDoc.email,
                role: userDoc.role
            }
        };

        return response;
    };
}