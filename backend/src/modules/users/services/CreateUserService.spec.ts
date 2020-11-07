import ClientError from '@shared/errors/ClientError';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to create a new user with nickname and password', async () => {
        const user = await createUser.execute({
            nickname: 'John Doe',
            password: 'somethingverysecretly',
        });

        const passwordWasHashed = await fakeHashProvider.compare(
            'somethingverysecretly',
            user.password,
        );

        expect(user).toHaveProperty('id');
        expect(passwordWasHashed).toBe(true);
    });

    it('should not be able to create a new user with a nickname that already exists', async () => {
        await createUser.execute({
            nickname: 'John Doe',
            password: 'somethingverysecretly',
        });

        expect(
            createUser.execute({
                nickname: 'John Doe',
                password: 'somethingverysecretlyagain',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });
});
