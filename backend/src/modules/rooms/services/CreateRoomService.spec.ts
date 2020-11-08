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

    it('should be able to create a new room with name and moderator', async () => {
        const moderator = await fakeUsersRepository.create({
            nickname: 'John Doe',
            password: 'somepasswordverysecretly',
        });

        const room = await createRoom.execute({
            room_name: 'some room name',
            moderator_user_id: moderator.id,
        });

        expect(room).toHaveProperty('id');
    });

    it('should not be able to create a new room with a user that does not exists as moderator', async () => {
        await expect(
            createRoom.execute({
                room_name: 'some room name',
                moderator_user_id: 'a user that does not exists',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });
});
