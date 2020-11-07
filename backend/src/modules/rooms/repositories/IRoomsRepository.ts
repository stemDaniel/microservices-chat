import Room from '../infra/typeorm/entities/Room';
import ICreateRoomDTO from '../dtos/ICreateRoomDTO';

interface IRoomsRepository {
    create(data: ICreateRoomDTO): Promise<Room>;
}

export default IRoomsRepository;
