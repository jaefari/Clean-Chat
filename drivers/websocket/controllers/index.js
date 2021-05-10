/* eslint-disable prefer-destructuring */
const joinedRooms = require('../../../use-cases').joinedRooms;
const sendMessageInRoom = require('../../../use-cases').sendMessageInRoom;
const createRoom = require('../../../use-cases').createRoom;
const joinRoom = require('../../../use-cases').joinRoom;

const joinedRoomsController = (user) => {
  return joinedRooms(user.id);
};

const sendMessageInRoomController = ({ user, messageInfo }) => {
  messageInfo.postedByUser = user.id;

  return sendMessageInRoom(messageInfo);
};

const createRoomController = ({ user, roomInfo }) => {
  roomInfo.chatInitiator = user.id;

  return createRoom(roomInfo);
};

const joinRoomController = ({ user, roomId }) => {
  const joinRoomInfo = { userId: user.id, roomId };

  return joinRoom(joinRoomInfo);
};


module.exports = {
  joinedRoomsController,
  sendMessageInRoomController,
  createRoomController,
  joinRoomController,
};
