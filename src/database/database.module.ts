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
                uri: "mongodb+srv://node:node@cluster0.pb7ej.mongodb.net/falaCidadao?retryWrites=true&w=majority",
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
