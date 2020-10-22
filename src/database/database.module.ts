import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './../config/app-config.module';
import { AppConfigService } from './../config/app-config.service';
import { UserRepository } from './repositories/user.repository';
import { ProblemRepository } from './repositories/problem.repository';
import { modelsProviderAsync } from './models.provider';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [AppConfigModule],
            useFactory: () => ({
                uri: process.env.DATABASE_URL ? process.env.DATABASE_URL : "mongodb://localhost:27017/falacidadao",
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }),
            inject: [AppConfigService]
        }),
        MongooseModule.forFeatureAsync(modelsProviderAsync),
    ],
    providers: [UserRepository, ProblemRepository],
    exports: [UserRepository, ProblemRepository]
})
export class DatabaseModule {}
