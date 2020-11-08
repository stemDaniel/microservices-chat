import Room from '../infra/typeorm/entities/Room';
import ICreateRoomDTO from '../dtos/ICreateRoomDTO';

interface IRoomsRepository {
    create(data: ICreateRoomDTO): Promise<Room>;
    findRoomByID(room_id: string): Promise<Room | undefined>;
}

export default IRoomsRepository;
