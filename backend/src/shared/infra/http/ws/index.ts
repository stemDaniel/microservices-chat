import socketio, { Socket } from 'socket.io';
import { Server } from 'http';

import attachJoinRoomSocket from '@modules/joins/infra/ws/sockets/attachJoinRoomSocket';
import attachLeaveRoomSocket from '@modules/joins/infra/ws/sockets/attachLeaveRoomSocket';

interface IChatMessage {
    message: string;
    user_id: string;
    room_name: string;
}

const estabilishWSAttachedOnHTTP = (server: Server): void => {
    // @ts-ignore
    const io = socketio(server);

    io.on('connection', (socket: Socket) => {
        socket.emit('message', 'WS estabilished!');

        attachJoinRoomSocket(socket);
        attachLeaveRoomSocket(socket);

        socket.on(
            'message',
            ({ user_id, room_name, message }: IChatMessage) => {
                io.to(room_name).emit('message', `${user_id} | ${message}!`);
            },
        );
    });
};

export default estabilishWSAttachedOnHTTP;
