const buildCreateRoom = ({ roomDb, userDb }) => {
  if (!roomDb) throw new Error('roomDb is not provided');
  if (!userDb) throw new Error('userDb is not provided');

  return async function createRoom(userId) {
    if (!userId) throw new Error('userId is not provided');

    // check user exists
    const user = await userDb.findById(userId);
    if (!user) throw new Error('user not found');

    return roomDb.joinedRooms(userId);
  };
};

module.exports = buildCreateRoom;
