import IRoomsRepository from '@modules/rooms/repositories/IRoomsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ClientError from '@shared/errors/ClientError';
import { injectable, inject } from 'tsyringe';
import ICreateJoinDTO from '../dtos/ICreateJoinDTO';
import Join from '../infra/typeorm/entities/Join';

import IJoinsRepository from '../repositories/IJoinsRepository';

type IRequest = Omit<ICreateJoinDTO, 'is_moderator'>;

@injectable()
class JoinARoomService {
    constructor(
        @inject('JoinsRepository')
        private joinsRepository: IJoinsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('RoomsRepository')
        private roomsRepository: IRoomsRepository,
    ) {}

    public async execute({ user_id, room_id }: IRequest): Promise<Join> {
        const user = await this.usersRepository.findUserByID(user_id);

        if (!user) {
            throw new ClientError(
                'it is not possible to join a room without being logged in!',
            );
        }

        const room = await this.roomsRepository.findRoomByID(room_id);

        if (!room) {
            throw new ClientError(
                'it is not possible to join a room that does not exist!',
            );
        }

        const verifyIfUserIsAlreadyJoined = await this.joinsRepository.findJoinByUserIDAndRoomID(
            {
                room_id,
                user_id,
            },
        );

        if (verifyIfUserIsAlreadyJoined) {
            throw new ClientError(
                'it is not possible to join a room that you are already in!',
            );
        }

        const join = await this.joinsRepository.create({
            user_id,
            room_id,
        });

        return join;
    }
}

export default JoinARoomService;
