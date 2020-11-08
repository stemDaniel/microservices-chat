import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FindAllRoomsService from './FindAllRoomsService';
import FakeRoomsRepository from '../repositories/fakes/FakeRoomsRepository';

let findAllRooms: FindAllRoomsService;
let fakeRoomsRepository: FakeRoomsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('FindAllRooms', () => {
    beforeEach(() => {
        fakeRoomsRepository = new FakeRoomsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        findAllRooms = new FindAllRoomsService(
            fakeRoomsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list all rooms', async () => {
        const room = await fakeRoomsRepository.create({
            name: 'Funny room',
        });

        const anotherRoom = await fakeRoomsRepository.create({
            name: 'Boring room',
        });

        const rooms = await findAllRooms.execute();

        expect(rooms[0].id).toBe(room.id);
        expect(rooms[1].id).toBe(anotherRoom.id);
    });

    it('should be able to list all rooms from the cache', async () => {
        const saveDataOnCache = jest.spyOn(fakeCacheProvider, 'save');

        await fakeRoomsRepository.create({
            name: 'Funny room',
        });

        await fakeRoomsRepository.create({
            name: 'Boring room',
        });

        await findAllRooms.execute();

        await findAllRooms.execute();

        expect(saveDataOnCache).toBeCalledTimes(1);
    });
});
