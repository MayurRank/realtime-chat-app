import { createServer, Server } from 'http';
import SocketIO from 'socket.io';
// import redis from 'redis';
// import adapter from 'socket.io-redis';
// import session from "../util/session";
import { ChatEvent, Statics } from './constants';
import _ from 'lodash';
import IoHelper from '../util/io.helper';
import { _addMessage, _setMessagesToSeen } from '../modules/message/message.controller';
import { _addConversation } from '../modules/conversation/conversation.controller';
import { isIoAuthenticated } from '../util/auth.helper';

const sendOnineList = (io: SocketIO.Server, map: any) => {
  //send online users list
  const onlineUserIds = Object.keys(map);
  if (onlineUserIds && onlineUserIds.length) {
    IoHelper.sendToAllConnectedClients(io, ChatEvent.ONLINE_LIST, onlineUserIds);
  }
}

const ioEvents = (io: SocketIO.Server | any) => {
  
  const map: any = {};

  io.use(function(socket: SocketIO.Socket | any, next: any) {
    isIoAuthenticated(socket, (err: string) => {
      if (err) {
        return next(new Error('authentication error'));
      } else {
        map[socket.x_user._id] = socket.id;
        console.log(map);
        return next();
      }
    });
  });

  io.on(ChatEvent.CONNECT, (socket: SocketIO.Socket | any) => {
    console.log('Connected client', socket.id);

    // Update online users list
    sendOnineList(io, map);

    //listen on new_chat
    socket.on(ChatEvent.NEW_MESSAGE, (data: any, cb: any) => {
      if (map[data.userId]) {
        IoHelper.sendToPrivate(io, map[data.userId], 'new_mesage', {message: data.message, time: data.time, fromUser: socket.x_user._id });
        cb({sent: true});
      } else {
        cb();
      }
      _addMessage({from: socket.x_user._id, to: data.userId, message: data.message, seen: false, conversation: socket[Statics.CONVERSATION_ID]});
    })
    //listen on read_mesage
    socket.on(ChatEvent.READ_MESSAGE, (data: {userId: string}) => {
      if (map[data.userId]) {
        _setMessagesToSeen({from: socket.x_user._id, to: data.userId});
        IoHelper.sendToPrivate(io, map[data.userId], 'read_mesage', {fromUser: socket.x_user._id });
      }
      _addConversation({participants: [socket.x_user._id, data.userId]}).then((response: any) => {
        socket[Statics.CONVERSATION_ID] = response && response._id;
      });
    })

    socket.on(ChatEvent.DISCONNECT, () => {
      delete map[socket.x_user._id];
      sendOnineList(io, map);
    });
  });
}

/**
 * Initialize Socket.io
 * Uses Redis as Adapter for Socket.io
 * @param app - express app instance
 */
export const init = (app: any) => {
  
  const server: Server	= createServer(app);
	const io: SocketIO.Server = require('socket.io')(server);

  // Force Socket.io to ONLY use "websockets"; No Long Polling.
	// io.set('transports', ['websocket']);

	// Using Redis
	// let port: any = process.env.REDIS_PORT;
	// let host = process.env.REDIS_HOST;
	// let pubClient: redis.RedisClient = redis.createClient(port, host);
	// let subClient: redis.RedisClient = redis.createClient(port, host, { return_buffers: true, });
	// io.adapter(adapter({ pubClient, subClient }));

	// Allow sockets to access session data
	// io.use((socket, next) => {
	// 	session(socket.request, {}, next);
	// });

	// Define all Events
	ioEvents(io);

	// The server object will be then used to list to a port number
	return server;
};