const makeRoom = require('../../models/room');

const buildCreateRoom = ({ roomDb, userDb }) => {
  if (!roomDb) throw new Error('roomDb is not provided');
  if (!userDb) throw new Error('userDb is not provided');

  return async function createRoom({ userId, roomId }) {
    if (!userId) throw new Error('userId is not provided');
    if (!roomId) throw new Error('roomId is not provided');

    // check user that wants to join the room exists
    const user = await userDb.findById(userId);
    if (!user) throw new Error('room you want to joinnot found');

    // check user that wants to join an existing room
    const roomFromDb = await roomDb.findById(roomId);
    if (!roomFromDb) throw new Error('room you want to joinnot found');

    const room = makeRoom(roomFromDb);
    if (room.getChatInitiator() === userId) throw new Error('you are already the initiator of this room, you do not need to rejoin');
    if (room.getUserIds().includes(userId)) throw new Error('you are already joined to this room, you do not need to rejoin');

    await roomDb.update({
      id: room.getId(),
      userIds: room.getUserIds().push(userId),
    });

    return roomDb.findById(room.getId());
  };
};

module.exports = buildCreateRoom;
