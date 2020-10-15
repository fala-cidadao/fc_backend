import { AppConfigModule } from './../config/app-config.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [AppConfigModule, DatabaseModule],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
