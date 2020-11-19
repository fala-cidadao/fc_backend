import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserService } from './user.service';

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
                email: "gabriel.nobrega6@ggg.com",
                password: "senha",
                role: "admin",
                phone: "99999999",
            })
            usersToBeDeleted.push(user._id)
            expect(user).toMatchObject({name: 'Gabriel', email: "gabriel.nobrega6@ggg.com", role: "admin", phone: "99999999"});
        });
        
    });

    describe('Should raise user already exists', () => {
        it('user should not be created',async () => {
            await expect(service.createUser({
                name: "Gabriel",
                email: "gabriel.nobrega6@ggg.com",
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
            const user = await service.getUserByEmail("gabriel.nobrega6@ggg.com")
            expect(user).toMatchObject({name: 'Gabriel', email: "gabriel.nobrega6@ggg.com", role: "admin", phone: "99999999"})
        });
    });
   
    describe('deleteUser should delete a user by its id', () => {
        it('DeleteUser should delete a user by its id"',async () => {
            const user = await service.createUser({
                name: "Mateus",
                email: "mateusantonino@gmail.com",
                password: "senha",
                role: "admin",
                phone: "99999999",
            })
            await service.deleteUser(user._id);
            expect(service.getUser(user._id)).rejects.toThrow('Usuário não encontrado');
        });
        
    });
    

    
    afterAll( async () => {
        const users = usersToBeDeleted.map(userId => {
            service.deleteUser(userId)
        })
        Promise.all(users).catch((err) => {
            throw Error(`Users failed to be deleted ${err}`)
        })
    })

});
