import 'reflect-metadata';

import ClientError from '@shared/errors/ClientError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeJoinsRepository from '@modules/joins/repositories/fakes/FakeJoinsRepository';
import CreateRoomService from './CreateRoomService';
import FakeRoomsRepository from '../repositories/fakes/FakeRoomsRepository';

let createRoom: CreateRoomService;
let fakeRoomsRepository: FakeRoomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeJoinsRepository: FakeJoinsRepository;

describe('CreateRoom', () => {
    beforeEach(() => {
        fakeRoomsRepository = new FakeRoomsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeJoinsRepository = new FakeJoinsRepository();

        createRoom = new CreateRoomService(
            fakeRoomsRepository,
            fakeUsersRepository,
            fakeJoinsRepository,
        );
    });

    it('should be able to create a new room', async () => {
        const moderator = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        const room = await createRoom.execute({
            name: 'Funny room',
            moderator_user_id: moderator.id,
        });

        expect(room).toHaveProperty('id');
    });

    it('should not be able to create a room with a moderator that does not exist', async () => {
        await expect(
            createRoom.execute({
                name: 'Funny room',
                moderator_user_id: 'User that does not exist',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });
});
