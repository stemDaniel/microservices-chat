import { v4 } from 'uuid';

import Room from '../../infra/typeorm/entities/Room';
import ICreateRoomDTO from '../../dtos/ICreateRoomDTO';
import IRoomsRepository from '../IRoomsRepository';

class FakeRoomsRepository implements IRoomsRepository {
    private rooms: Room[] = [];

    public async create(data: ICreateRoomDTO): Promise<Room> {
        const room = new Room();

        const roomData = {
            ...data,
            created_at: new Date(),
            id: v4(),
        } as Room;

        Object.assign(room, roomData);

        this.rooms.push(room);

        return room;
    }

    public async findAll(): Promise<Room[]> {
        return this.rooms;
    }

    public async findRoomByID(room_id: string): Promise<Room | undefined> {
        return this.rooms.find(room => room.id === room_id);
    }
}

export default FakeRoomsRepository;
