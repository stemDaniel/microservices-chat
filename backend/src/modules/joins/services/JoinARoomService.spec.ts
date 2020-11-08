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

    it('should be able make user join a room', async () => {
        const user = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretlypassword',
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

    it('should not be able to join a room if the user does not exists', async () => {
        const room = await fakeRoomsRepository.create({
            name: 'Funny room',
        });

        await expect(
            joinARoom.execute({
                user_id: 'Some user that does not exists',
                room_id: room.id,
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to join a room that does not exists', async () => {
        const user = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretlypassword',
        });

        await expect(
            joinARoom.execute({
                user_id: user.id,
                room_id: 'Some room that does not exists',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to join a room if you already joined', async () => {
        const user = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretlypassword',
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
