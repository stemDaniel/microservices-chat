import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRoomsRepository from '@modules/rooms/repositories/fakes/FakeRoomsRepository';
import ClientError from '@shared/errors/ClientError';
import FakeJoinsRepository from '../repositories/fakes/FakeJoinsRepository';
import KickAUserOutOfTheRoomService from './KickAUserOutOfTheRoomService';

let kickAUserOutOfTheRoom: KickAUserOutOfTheRoomService;
let fakeJoinsRepository: FakeJoinsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRoomsRepository: FakeRoomsRepository;

describe('KickAUserOutOfTheRoom', () => {
    beforeEach(() => {
        fakeJoinsRepository = new FakeJoinsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeRoomsRepository = new FakeRoomsRepository();

        kickAUserOutOfTheRoom = new KickAUserOutOfTheRoomService(
            fakeJoinsRepository,
            fakeRoomsRepository,
        );
    });

    it('should be able to kick a user out of the room', async () => {
        const userKicked = jest.spyOn(fakeJoinsRepository, 'delete');

        const moderator = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        const user = await fakeUsersRepository.create({
            nickname: 'Shitposter',
            password: 'strangepassword',
        });

        const room = await fakeRoomsRepository.create({
            name: 'Just cool users',
        });

        await fakeJoinsRepository.create({
            room_id: room.id,
            user_id: moderator.id,
            is_moderator: true,
        });

        const userJoin = await fakeJoinsRepository.create({
            room_id: room.id,
            user_id: user.id,
        });

        await kickAUserOutOfTheRoom.execute({
            moderator_user_id: moderator.id,
            kick_user_id: user.id,
            room_id: room.id,
        });

        expect(userKicked).toHaveBeenCalledWith(userJoin.id);
    });

    it('should not be able to kick a user out of a room that does not exist', async () => {
        const moderator = await fakeUsersRepository.create({
            nickname: 'Happy user',
            password: 'verysecretpassword',
        });

        const user = await fakeUsersRepository.create({
            nickname: 'Shitposter',
            password: 'strangepassword',
        });

        const room = await fakeRoomsRepository.create({
            name: 'Just cool users',
        });

        await fakeJoinsRepository.create({
            room_id: room.id,
            user_id: moderator.id,
            is_moderator: true,
        });

        await fakeJoinsRepository.create({
            room_id: room.id,
            user_id: user.id,
        });

        await expect(
            kickAUserOutOfTheRoom.execute({
                moderator_user_id: moderator.id,
                kick_user_id: user.id,
                room_id: 'Room that does not exist',
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to kick a user out of a room if you are not the moderator', async () => {
        const moderator = await fakeUsersRepository.create({
            nickname: 'I am not a moderator',
            password: 'verysecretpassword',
        });

        const user = await fakeUsersRepository.create({
            nickname: 'Shitposter',
            password: 'strangepassword',
        });

        const room = await fakeRoomsRepository.create({
            name: 'Just cool users',
        });

        await fakeJoinsRepository.create({
            room_id: room.id,
            user_id: moderator.id,
        });

        await fakeJoinsRepository.create({
            room_id: room.id,
            user_id: user.id,
        });

        await expect(
            kickAUserOutOfTheRoom.execute({
                moderator_user_id: moderator.id,
                kick_user_id: user.id,
                room_id: room.id,
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });

    it('should not be able to kick a user that is not in the room', async () => {
        const moderator = await fakeUsersRepository.create({
            nickname: 'I am not a moderator but I want justice',
            password: 'verysecretpassword',
        });

        const user = await fakeUsersRepository.create({
            nickname: 'Shitposter',
            password: 'strangepassword',
        });

        const room = await fakeRoomsRepository.create({
            name: 'Just cool users',
        });

        await fakeJoinsRepository.create({
            room_id: room.id,
            user_id: moderator.id,
            is_moderator: true,
        });

        await expect(
            kickAUserOutOfTheRoom.execute({
                moderator_user_id: moderator.id,
                kick_user_id: user.id,
                room_id: room.id,
            }),
        ).rejects.toBeInstanceOf(ClientError);
    });
});
