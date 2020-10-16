import { AppConfigModule } from './../config/app-config.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';

@Module({
    imports: [AppConfigModule, DatabaseModule],
    providers: [ProblemService],
    controllers: [ProblemController],
})
export class ProblemModule {}
