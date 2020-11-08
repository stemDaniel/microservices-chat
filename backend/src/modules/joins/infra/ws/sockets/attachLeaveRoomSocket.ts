import { container } from 'tsyringe';
import { Socket } from 'socket.io';

import ClientError from '@shared/errors/ClientError';
import LeaveARoomService from '../../../services/LeaveARoomService';

interface ILeaveRoomRequest {
    user_id: string;
    room_id: string;
}

const attachLeaveRoomSocket = (socket: Socket): void => {
    socket.on('leaveRoom', async ({ user_id, room_id }: ILeaveRoomRequest) => {
        try {
            const leaveARoom = container.resolve(LeaveARoomService);

            await leaveARoom.execute({
                user_id,
                room_id,
            });

            socket.join(room_id);

            socket
                .to(room_id)
                .broadcast.emit('chatMessage', `${user_id} has left the room!`);
        } catch (err) {
            if (err instanceof ClientError) {
                socket.emit(
                    'errorMessage',
                    `Error when trying to leave the room: ${err.message}`,
                );
            } else {
                socket.emit(
                    'errorMessage',
                    `Internal server error! Please, try again later.`,
                );
            }
        }
    });
};
export default attachLeaveRoomSocket;
