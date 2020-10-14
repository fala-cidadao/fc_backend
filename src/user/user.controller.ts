import { Controller } from '@nestjs/common';
import { UserRepository } from './../database/repositories/user.repository';

@Controller()
export class UserController {
    constructor(private readonly databaseRepository: UserRepository) {}

    public create() {
        const user = this.databaseRepository.GetUserModel.create();
        return user;
    }
}
