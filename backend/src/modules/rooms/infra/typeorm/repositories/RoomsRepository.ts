import { EntityRepository, Repository, getRepository } from 'typeorm';

import Room from '../entities/Room';
import ICreateRoomDTO from '../../../dtos/ICreateRoomDTO';
import IRoomsRepository from '../../../repositories/IRoomsRepository';

@EntityRepository(Room)
class RoomsRepository implements IRoomsRepository {
    private ormRepository: Repository<Room>;

    constructor() {
        this.ormRepository = getRepository(Room);
    }

    public async create(data: ICreateRoomDTO): Promise<Room> {
        const room = this.ormRepository.create(data);

        await this.ormRepository.save(room);

        return room;
    }

    public async findRoomByID(room_id: string): Promise<Room | undefined> {
        const room = await this.ormRepository.findOne({
            where: { id: room_id },
        });

        return room;
    }
}

export default RoomsRepository;
