import ClientError from '@shared/errors/ClientError';
import { inject, injectable } from 'tsyringe';
import IRoomsRepository from '@modules/rooms/repositories/IRoomsRepository';
import IJoinsRepository from '../repositories/IJoinsRepository';

interface IRequest {
    moderator_user_id: string;
    kick_user_id: string;
    room_id: string;
}

@injectable()
class KickAUserOutOfTheRoomService {
    constructor(
        @inject('JoinsRepository')
        private joinsRepository: IJoinsRepository,

        @inject('RoomsRepository')
        private roomsRepository: IRoomsRepository,
    ) {}

    public async execute({
        kick_user_id,
        moderator_user_id,
        room_id,
    }: IRequest): Promise<void> {
        const verifyIfRoomExists = await this.roomsRepository.findRoomByID(
            room_id,
        );

        if (!verifyIfRoomExists) {
            throw new ClientError(
                'it is not possible to remove a user from a room that does not exist!',
            );
        }

        const verifyIfUserIsModerator = await this.joinsRepository.findJoinByUserIDAndRoomID(
            {
                user_id: moderator_user_id,
                room_id,
            },
        );

        if (!verifyIfUserIsModerator || !verifyIfUserIsModerator.is_moderator) {
            throw new ClientError(
                'it is not possible to remove a user if you are not the room moderator!',
            );
        }

        const verifyIfUserIsJoined = await this.joinsRepository.findJoinByUserIDAndRoomID(
            {
                user_id: kick_user_id,
                room_id,
            },
        );

        if (!verifyIfUserIsJoined) {
            throw new ClientError(
                'it is not possible to remove a user who is not in the room!',
            );
        }

        await this.joinsRepository.delete(verifyIfUserIsJoined.id);
    }
}

export default KickAUserOutOfTheRoomService;
