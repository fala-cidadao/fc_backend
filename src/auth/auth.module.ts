import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AppConfigService } from './../config/app-config.service';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { Constants } from '../constants/constants';
import { MailerModule } from '@nestjs-modules/mailer'
import { EmailService } from './email.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL_ID, 
                  pass: process.env.EMAIL_PASS
                },
              }
        }),
        DatabaseModule, 
        JwtModule.register({
            secret: Constants.secret,
            signOptions: Constants.signOptions}),
        
        ],
    controllers: [AuthController],
    providers: [AuthService, UserService, AppConfigService, EmailService],
    exports: [AuthService]
})
export class AuthModule {}
