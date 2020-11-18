import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { ProblemModule } from './problem/problem.module';

@Module({
    imports: [AppConfigModule, DatabaseModule, UserModule, AuthModule, ProblemModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
