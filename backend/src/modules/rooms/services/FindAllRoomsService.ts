import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

import Room from '../infra/typeorm/entities/Room';
import IRoomsRepository from '../repositories/IRoomsRepository';

interface IRequest {
    moderator_user_id: string;
    name: string;
}

@injectable()
class FindAllRoomService {
    constructor(
        @inject('RoomsRepository')
        private roomsRepository: IRoomsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Room[]> {
        let rooms = await this.cacheProvider.recovery<Room[]>('rooms');

        if (!rooms) {
            rooms = await this.roomsRepository.findAll();

            await this.cacheProvider.save('rooms', rooms);
        }

        return rooms;
    }
}

export default FindAllRoomService;
