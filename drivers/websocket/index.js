/* eslint-disable object-curly-newline */
/* eslint-disable prefer-rest-params */
const io = require('socket.io')(8081);
const controller = require('./controllers');
const { verify } = require('../../utils/auth');

io.use(async (socket, next) => {
  if (!socket.handshake.auth.token) {
    const err = new Error('not authorized');
    err.data = { content: 'token is not provided in socket client connection' };
    next(err);
  }

  try {
    socket.user = await verify(socket.handshake.auth.token);
    next();
  } catch (err) {
    next(err);
  }
});

io.on('connection', async (socket) => {
  // //////////////////////////////////////////////////////////////////////////////
  // simple wraper to prevent error handling on each event separately
  // //////////////////////////////////////////////////////////////////////////////
  function makeSafe(f) {
    // eslint-disable-next-line func-names, consistent-return
    return async function () {
      try {
        console.log(arguments);
        return await f.apply(this, arguments);
      } catch (err) {
        console.log('xhere', err);
        socket.emit('response', { requestId: arguments[0].requestId, status: err.status || 500, message: err.message || 'something wrong happened' });
      }
    };
  }


  // //////////////////////////////////////////////////////////////////////////////
  // Initializations steps
  // //////////////////////////////////////////////////////////////////////////////
  const { user } = socket;
  console.log('connected', user);

  // on client connect join it to all of it's rooms thta it has joined before
  const joinedRoomIds = await controller.joinedRoomsController(user);
  joinedRoomIds.forEach((joinedRoomId) => socket.join(joinedRoomId));


  // //////////////////////////////////////////////////////////////////////////////
  // handling events by appropriate controllers
  // //////////////////////////////////////////////////////////////////////////////
  socket.on('sendMessageInRoom', makeSafe(async (messageInfo) => {
    // do business operations
    await controller.sendMessageInRoomController({ user, messageInfo });

    // use socket only as a communication tools
    io.to(messageInfo.roomId).emit('message', messageInfo.message);
  }));

  socket.on('createRoom', makeSafe(async ({ requestId, ...roomInfo }) => {
    const room = await controller.createRoomController({ user, roomInfo });

    // client sets requestId, then response will be sent with it requestId
    socket.emit('response', { requestId, status: 200, message: 'room cretaed', data: room });
  }));

  socket.on('joinedRooms', makeSafe(async ({ requestId }) => {
    const listOfJoinedRooms = await controller.joinedRoomsController(user);

    socket.emit('response', { requestId, status: 200, message: 'list returned', data: { listOfJoinedRooms } });
  }));

  socket.on('joinRoom', makeSafe(async ({ requestId, roomId }) => {
    await controller.joinRoomController({ user, roomId });

    socket.emit('response', { requestId, status: 200, message: `you joined the room ${roomId}` });
  }));
});
