import { container } from 'tsyringe';
import { Socket } from 'socket.io';

import ClientError from '@shared/errors/ClientError';
import JoinARoomService from '../../../services/JoinARoomService';

interface IJoinARoomRequest {
    user_id: string;
    room_id: string;
}

const attachJoinRoomSocket = (socket: Socket): void => {
    socket.on('joinRoom', async ({ user_id, room_id }: IJoinARoomRequest) => {
        try {
            const joinARoom = container.resolve(JoinARoomService);

            await joinARoom.execute({
                room_id,
                user_id,
            });

            socket.join(room_id);

            socket
                .to(room_id)
                .broadcast.emit('message', `${user_id} has joined the room!`);
        } catch (err) {
            if (err instanceof ClientError) {
                socket.emit(
                    'errorMessage',
                    `Error when trying to join a room: ${err.message}`,
                );
            } else {
                socket.emit('errorMessage', `Internal server error!`);
            }
        }
    });
};
export default attachJoinRoomSocket;
