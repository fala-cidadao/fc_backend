import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AppConfigService } from './../config/app-config.service';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { Constants } from '../constants/constants';

@Module({
    imports: [DatabaseModule, JwtModule.register({
        secret: Constants.secret,
        signOptions: Constants.signOptions
    })],
    controllers: [AuthController],
    providers: [AuthService, UserService, AppConfigService],
    exports: [AuthService]
})
export class AuthModule {}
