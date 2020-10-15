import { Controller } from '@nestjs/common';
import { UserRepository } from './../database/repositories/user.repository';

@Controller()
export class UserController {
    constructor(private readonly userRepository: UserRepository) {}

    public create() {
        const user = this.userRepository.GetUserModel.create();
        return user;
    }
}
