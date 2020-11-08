import socketio, { Socket } from 'socket.io';
import { Server } from 'http';

interface IJoinRoom {
    room_name: string;
    user_id: string;
}

interface ILeaveRoom {
    room_name: string;
    user_id: string;
}

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

        socket.on('joinRoom', ({ room_name, user_id }: IJoinRoom) => {
            socket.join(room_name);

            socket
                .to(room_name)
                .broadcast.emit('message', `${user_id} has join the room!`);
        });

        socket.on(
            'message',
            ({ user_id, room_name, message }: IChatMessage) => {
                io.to(room_name).emit('message', `${user_id} | ${message}!`);
            },
        );

        socket.on('leaveRoom', ({ user_id, room_name }: ILeaveRoom) => {
            socket
                .to(room_name)
                .broadcast.emit('message', `${user_id} has left the room!`);
        });
    });
};

export default estabilishWSAttachedOnHTTP;
