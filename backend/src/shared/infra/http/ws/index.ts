import socketio from 'socket.io';
import { Server } from 'http';

const estabilishWSAttachedOnHTTP = (server: Server): void => {
    // @ts-ignore
    const io = socketio(server);

    io.on('connection', () => {
        console.log('ws');
    });
};

export default estabilishWSAttachedOnHTTP;
