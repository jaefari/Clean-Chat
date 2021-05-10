// eslint-disable-next-line prefer-destructuring
const joinRoom = require('../../../use-cases').joinRoom; // for testing purpose it's MUCH better to prevent destrucying

const postToJoinRoom = async (httpRequest) => {
  const { roomId } = httpRequest.body;
  const { user } = httpRequest;

  const joinRoomInfo = { userId: user.id, roomId };

  try {
    const joinedRoom = await joinRoom(joinRoomInfo);
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 201,
      body: { joinedRoom },
    };
  } catch (error) {
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 400,
      body: { error: error.message },
    };
  }
};

module.exports = postToJoinRoom;
