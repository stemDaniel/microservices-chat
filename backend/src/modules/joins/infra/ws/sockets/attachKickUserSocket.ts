import { container } from 'tsyringe';
import { Socket } from 'socket.io';

import ClientError from '@shared/errors/ClientError';
import KickAUserOutOfTheRoomService from '../../../services/KickAUserOutOfTheRoomService';

interface IKickUserRequest {
    moderator_user_id: string;
    kick_user_id: string;
    room_id: string;
}

const attachKickUserSocket = (socket: Socket): void => {
    socket.on(
        'kickUser',
        async ({
            moderator_user_id,
            kick_user_id,
            room_id,
        }: IKickUserRequest) => {
            try {
                const kickAUserOutOfTheRoom = container.resolve(
                    KickAUserOutOfTheRoomService,
                );

                await kickAUserOutOfTheRoom.execute({
                    moderator_user_id,
                    kick_user_id,
                    room_id,
                });

                // socket.leave(room_id);

                socket
                    .to(room_id)
                    .broadcast.emit(
                        'chatMessage',
                        `${kick_user_id} has kicked from the room by ${moderator_user_id}!`,
                    );
            } catch (err) {
                if (err instanceof ClientError) {
                    socket.emit(
                        'errorMessage',
                        `Error when trying to kick user out of the room: ${err.message}`,
                    );
                } else {
                    socket.emit(
                        'errorMessage',
                        `Internal server error! Please, try again later.`,
                    );
                }
            }
        },
    );
};
export default attachKickUserSocket;
