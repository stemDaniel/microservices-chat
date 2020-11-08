import 'reflect-metadata';

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

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        const passwordWasHashed = await fakeHashProvider.compare(
            'verysecretpassword',
            user.password,
        );

        expect(user).toHaveProperty('id');
        expect(passwordWasHashed).toBe(true);
    });

    it('should not be able to create a new user with a nickname that is already in use', async () => {
        await createUser.execute({
            nickname: 'The same user',
            password: 'verysecretpassword',
        });

        await expect(
            createUser.execute({
                nickname: 'The same user',
                password: 'ultrasecretpassword',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });
});
