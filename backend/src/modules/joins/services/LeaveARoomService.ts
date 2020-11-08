import IRoomsRepository from '@modules/rooms/repositories/IRoomsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ClientError from '@shared/errors/ClientError';
import { injectable, inject } from 'tsyringe';

import IJoinsRepository from '../repositories/IJoinsRepository';

interface IRequest {
    user_id: string;
    room_id: string;
}

@injectable()
class LeaveARoomService {
    constructor(
        @inject('JoinsRepository')
        private joinsRepository: IJoinsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('RoomsRepository')
        private roomsRepository: IRoomsRepository,
    ) {}

    public async execute({ user_id, room_id }: IRequest): Promise<void> {
        const user = await this.usersRepository.findUserByID(user_id);

        if (!user) {
            throw new ClientError(
                'Its not possible to left a room with a user that does not exists!',
            );
        }

        const room = await this.roomsRepository.findRoomByID(room_id);

        if (!room) {
            throw new ClientError(
                'Its not possible to left a room that does not exists!',
            );
        }

        const join = await this.joinsRepository.findJoinByUserIDAndRoomID({
            room_id,
            user_id,
        });

        if (!join) {
            throw new ClientError(
                'Its not possible to left a room if you already left it!',
            );
        }

        await this.joinsRepository.delete(join.id);
    }
}

export default LeaveARoomService;
