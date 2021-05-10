const buildURoomDb = ({ database }) => {
  const insert = async (roomInfo) => {
    database.push(roomInfo);
    return roomInfo;
  };

  const findById = async (id) => {
    const room = database.filter((c) => c.id === id);
    if (room.length > 0) return room[0];
    throw new Error('room not found');
  };

  const update = async ({ id, ...roomInfo }) => {
    let room = findById(id);
    room = { id, ...roomInfo };
    return room;
  };

  const joinedRooms = async (userId) => {
    const rooms = database.filter(
      (room) => room.chatInitiator === userId || room.userIds.includes(userId),
    );
    const roomIds = rooms.map((room) => room.id);
    return roomIds;
  };

  return Object.freeze({
    insert,
    findById,
    update,
    joinedRooms,
  });
};

module.exports = buildURoomDb;
