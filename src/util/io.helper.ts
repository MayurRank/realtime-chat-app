import _ from 'lodash';
import SocketIO from 'socket.io';

// sending to self
const sendToSelf = (socket: SocketIO.Socket, method: string, data: any) => {
    socket.emit(method, data);
};

// sending to self from connected sockets
const _sendToSelf = (io: SocketIO.Server, socketId: string, method: string, data: any) => {
    _.each(io.sockets.sockets, function(socket) {
        if (socket.id === socketId) {
            socket.emit(method, data);
        }
    });
};

// sending to all clients, include sender
const sendToAllConnectedClients = (io: SocketIO.Server, method: string, data: any) => {
    io.sockets.emit(method, data);
};

// sending to all clients in room(channel) include sender
const sendToAllClientsInRoom = (io: SocketIO.Server, room: string, method: string, data: any) => {
    io.sockets.in(room).emit(method, data);
};

// sending to all clients in room(channel) except sender
const sendToAllClientsInRoomExceptByIo = (io: SocketIO.Server, room: string, method: string, data: any) => {
    io.sockets.to(room).emit(method, data);
};

// sending to all clients in room(channel) except sender
const sendToAllClientsInRoomExcept = (socket: SocketIO.Socket, room: string, method: string, data: any) => {
    socket.broadcast.to(room).emit(method, data);
};

// sending to individual socketid (private message)
const sendToPrivate = (io: SocketIO.Server, socketId: string, method: string, data: any) => {
    io.to(socketId).emit(method, data);
};

// sending to sender-client only (except one)
const sendToAllExcept = (io: SocketIO.Server, exceptSocketId: string, method: string, data: any) => {
    _.each(io.sockets.sockets, function(socket) {
        if (socket.id !== exceptSocketId) {
            socket.emit(method, data);
        }
    });
};

export default {
    sendToSelf: sendToSelf,
    _sendToSelf: _sendToSelf,
    sendToAllConnectedClients: sendToAllConnectedClients,
    sendToAllExcept: sendToAllExcept,
    sendToAllClientsInRoom: sendToAllClientsInRoom,
    sendToAllClientsInRoomExcept: sendToAllClientsInRoomExcept,
    sendToPrivate: sendToPrivate,
    sendToAllClientsInRoomExceptByIo: sendToAllClientsInRoomExceptByIo
};