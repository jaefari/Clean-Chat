const userDb = require('../data-access/user-db');
const roomDb = require('../data-access/room-db');

const buildCreateUser = require('./create-user');
const buildCreateRoom = require('./create-room');
const buildSendMessageInRoom = require('./send-message-in-room');
const buildUserLogin = require('./user-login');
const buildJoinRoom = require('./join-room');
const buildJoinedRooms = require('./joined-rooms');

const createUser = buildCreateUser({ userDb });
const createRoom = buildCreateRoom({ roomDb, userDb });
const sendMessageInRoom = buildSendMessageInRoom({ roomDb });
const userLogin = buildUserLogin({ userDb });
const joinRoom = buildJoinRoom({ roomDb, userDb });
const joinedRooms = buildJoinedRooms({ roomDb, userDb });

module.exports = {
  createUser,
  createRoom,
  sendMessageInRoom,
  userLogin,
  joinRoom,
  joinedRooms,
};
