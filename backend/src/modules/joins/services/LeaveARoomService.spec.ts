import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRoomsRepository from '@modules/rooms/repositories/fakes/FakeRoomsRepository';
import ClientError from '@shared/errors/ClientError';
import FakeJoinsRepository from '../repositories/fakes/FakeJoinsRepository';
import LeaveARoomService from './LeaveARoomService';

let leaveARoom: LeaveARoomService;
let fakeJoinsRepository: FakeJoinsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsRepository: FakeRoomsRepository;

describe('LeaveARoom', () => {
    beforeEach(() => {
        fakeJoinsRepository = new FakeJoinsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeRoomsRepository = new FakeRoomsRepository();

        leaveARoom = new LeaveARoomService(
            fakeJoinsRepository,
            fakeUsersRepository,
            fakeRoomsRepository,
        );
    });

    it('should be able to leave a room', async () => {
        const deleteJoin = jest.spyOn(fakeJoinsRepository, 'delete');

        const user = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        const room = await fakeRoomsRepository.create({
            name: 'Funny room',
        });

        const join = await fakeJoinsRepository.create({
            room_id: room.id,
            user_id: user.id,
        });

        await leaveARoom.execute({
            room_id: room.id,
            user_id: user.id,
        });

        expect(deleteJoin).toHaveBeenCalledWith(join.id);
    });

    it('should not be able to leave a room without being logged in', async () => {
        await expect(
            leaveARoom.execute({
                user_id: 'User that does not exist',
                room_id: 'Some room',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to leave a room that does not exists', async () => {
        const user = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        await expect(
            leaveARoom.execute({
                room_id: 'Room that does not exist',
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to leave a room that you have already left', async () => {
        const user = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        const room = await fakeRoomsRepository.create({
            name: 'Funny room',
        });

        await expect(
            leaveARoom.execute({
                room_id: room.id,
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });
});
