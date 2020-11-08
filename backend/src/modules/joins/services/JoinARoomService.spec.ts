import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRoomsRepository from '@modules/rooms/repositories/fakes/FakeRoomsRepository';
import ClientError from '@shared/errors/ClientError';
import JoinARoomService from './JoinARoomService';
import FakeJoinsRepository from '../repositories/fakes/FakeJoinsRepository';

let joinARoom: JoinARoomService;
let fakeJoinsRepository: FakeJoinsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsRepository: FakeRoomsRepository;

describe('JoinARoom', () => {
    beforeEach(() => {
        fakeJoinsRepository = new FakeJoinsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeRoomsRepository = new FakeRoomsRepository();

        joinARoom = new JoinARoomService(
            fakeJoinsRepository,
            fakeUsersRepository,
            fakeRoomsRepository,
        );
    });

    it('should be able to a the room', async () => {
        const user = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        const room = await fakeRoomsRepository.create({
            name: 'Funny room',
        });

        const join = await joinARoom.execute({
            user_id: user.id,
            room_id: room.id,
        });

        expect(join).toHaveProperty('id');
    });

    it('should not be able to join a room without being logged in', async () => {
        const room = await fakeRoomsRepository.create({
            name: 'Funny room',
        });

        await expect(
            joinARoom.execute({
                user_id: 'User that does not exists',
                room_id: room.id,
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to join a room that does not exist', async () => {
        const user = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        await expect(
            joinARoom.execute({
                user_id: user.id,
                room_id: 'Room that does not exist',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to join a room that you are already in', async () => {
        const user = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        const room = await fakeRoomsRepository.create({
            name: 'Funny room',
        });

        await joinARoom.execute({
            user_id: user.id,
            room_id: room.id,
        });

        await expect(
            joinARoom.execute({
                user_id: user.id,
                room_id: room.id,
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });
});
