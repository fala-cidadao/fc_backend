import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './../config/app-config.module';
import { AppConfigService } from './../config/app-config.service';
import { UserRepository } from './repositories/user.repository';
import { ProblemRepository } from './repositories/problem.repository';
import { modelsProvider } from './models.provider';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [AppConfigModule],
            useFactory: (appConfigService: AppConfigService) => ({
                uri: appConfigService.databaseUrl,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }),
            inject: [AppConfigService]
        }),
        MongooseModule.forFeature(modelsProvider),
    ],
    providers: [UserRepository, ProblemRepository],
    exports: [UserRepository, ProblemRepository]
})
export class DatabaseModule {}
