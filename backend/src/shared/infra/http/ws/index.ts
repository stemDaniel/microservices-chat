import socketio, { Socket } from 'socket.io';
import { Server } from 'http';

import attachCreateRoomSocket from '@modules/rooms/infra/ws/sockets/attachCreateRoomSocket';
import attachJoinRoomSocket from '@modules/joins/infra/ws/sockets/attachJoinRoomSocket';
import attachLeaveRoomSocket from '@modules/joins/infra/ws/sockets/attachLeaveRoomSocket';
import attachKickUserSocket from '@modules/joins/infra/ws/sockets/attachKickUserSocket';

interface IChatMessage {
    message: string;
    user_id: string;
    room_name: string;
}

const estabilishWSAttachedOnHTTP = (server: Server): void => {
    // @ts-ignore
    const io = socketio(server);

    io.on('connection', (socket: Socket) => {
        socket.emit('generalMessage', 'WS estabilished!');

        attachCreateRoomSocket(socket);
        attachJoinRoomSocket(socket);
        attachLeaveRoomSocket(socket);
        attachKickUserSocket(socket);
    });
};

export default estabilishWSAttachedOnHTTP;
