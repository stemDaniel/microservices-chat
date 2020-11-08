import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ClientError from '@shared/errors/ClientError';
import IJoinsRepository from '@modules/joins/repositories/IJoinsRepository';
import Room from '../infra/typeorm/entities/Room';
import IRoomsRepository from '../repositories/IRoomsRepository';

interface IRequest {
    moderator_user_id: string;
    room_name: string;
}

@injectable()
class CreateRoomService {
    constructor(
        @inject('RoomsRepository')
        private roomsRepository: IRoomsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('JoinsRepository')
        private joinsRepository: IJoinsRepository,
    ) {}

    public async execute({
        moderator_user_id,
        room_name,
    }: IRequest): Promise<Room> {
        const verifyIfModeratorExists = await this.usersRepository.findUserByID(
            moderator_user_id,
        );

        if (!verifyIfModeratorExists) {
            throw new ClientError(
                'Its not possible to create a room with a moderator that does not exists!',
            );
        }

        const room = await this.roomsRepository.create({
            name: room_name,
        });

        await this.joinsRepository.create({
            room_id: room.id,
            user_id: moderator_user_id,
            is_moderator: true,
        });

        return room;
    }
}

export default CreateRoomService;
