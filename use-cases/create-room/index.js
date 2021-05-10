const makeRoom = require('../../models/room');

const buildCreateRoom = ({ roomDb, userDb }) => {
  if (!roomDb) throw new Error('roomDb is not provided');
  if (!userDb) throw new Error('userDb is not provided');

  return async function createRoom(roomInfo) {
    // check user that wants to create the room exists
    await userDb.findById(roomInfo.chatInitiator);

    // TODO: chceck userIds are in db

    const room = makeRoom(roomInfo);


    await roomDb.insert({
      id: room.getId(),
      userIds: room.getUserIds(),
      messages: room.getMessages(),
      type: room.getType(),
      chatInitiator: room.getChatInitiator(),
    });

    return roomDb.findById(room.getId());
  };
};

module.exports = buildCreateRoom;
