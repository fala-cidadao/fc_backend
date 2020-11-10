import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { UserDto } from '../interfaces/user.interface'
import { BadRequestException, Logger } from '@nestjs/common';

expect.extend({
    toHaveSameProperties(received, expected) {

        const result = Object.keys(expected).filter((r) => {
            return !received[r]
        })
        console.log(result)
        return {
            message: () => "nope",
            pass: false
        }
    }
});

describe('UserService', () => {
    let service: UserService;
    const usersToBeDeleted = []

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Create Users', () => {
        it('user should be created',async () => {
            const user = await service.createUser({
                name: "Gabriel",
                email: "gabriel.nobrega0110@ggg.com",
                password: "elmarehcorno",
                role: "admin",
                phone: "99999999",
            })
            usersToBeDeleted.push(user._id)
            expect(user).toMatchObject({name: 'Gabriel', email: "gabriel.nobrega0110@ggg.com", role: "admin", phone: "99999999"});
        });
        
    });


    describe('Should raise user already exists', () => {
        it('user should not be created',async () => {
            await expect(service.createUser({
                name: "Gabriel",
                email: "gabriel.nobrega0110@ggg.com",
                password: "elmarehcorno",
                role: "admin",
                phone: "99999999",
            })).rejects.toThrow("User email already exists")
        });
        
    });
    

    describe('getAllUsers must return an array', () => {
        it('getAllUsers must return an array"',async () => {
            const users = await service.getAllUsers()
            expect(users).toBeInstanceOf(Array);
        });
    });
    describe('getUserByEmail must return a user by its email',() => {
        it('getUserByEmail mus return a user by its email',async () => {
            const user = await service.getUserByEmail("gabriel.nobrega0110@ggg.com")
            expect(user).toMatchObject({name: 'Gabriel', email: "gabriel.nobrega0110@ggg.com", role: "admin", phone: "99999999"})
        });
    });
    

    afterAll( async () => {
        const users = usersToBeDeleted.map(userId => {
            service.deleteUser(userId)
        })

        Promise.all(users).then(result => {
            console.log("All createdUsers Deleted")
        })
    })

});
