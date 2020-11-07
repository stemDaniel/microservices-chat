import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('should be able to create a new user with nickname and password', async () => {
        const user = await createUser.execute({
            nickname: 'John Doe',
            password: 'somethingverysecretly',
        });

        expect(user).toHaveProperty('id');
    });
});
