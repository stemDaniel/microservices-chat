import { container } from 'tsyringe';
import { Socket } from 'socket.io';

import ClientError from '@shared/errors/ClientError';
import CreateRoomService from '../../../services/CreateRoomService';

interface ICreateRoomRequest {
    moderator_user_id: string;
    room_name: string;
}

const attachCreateRoomSocket = (socket: Socket): void => {
    socket.on(
        'createRoom',
        async ({ moderator_user_id, room_name }: ICreateRoomRequest) => {
            try {
                const createRoom = container.resolve(CreateRoomService);

                const room = await createRoom.execute({
                    moderator_user_id,
                    name: room_name,
                });

                socket.join(room.id);
            } catch (err) {
                if (err instanceof ClientError) {
                    socket.emit(
                        'errorMessage',
                        `Error when trying to create the room: ${err.message}`,
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
export default attachCreateRoomSocket;
