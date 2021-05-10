// eslint-disable-next-line prefer-destructuring
const createRoom = require('../../../use-cases').createRoom; // for testing purpose it's MUCH better to prevent destrucying

const postRoom = async (httpRequest) => {
  const { ...roomInfo } = httpRequest.body;
  const { user } = httpRequest;

  roomInfo.chatInitiator = user.id;

  try {
    const posted = await createRoom(roomInfo);
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 201,
      body: { posted },
    };
  } catch (error) {
    // TODO: Error logging
    console.log('here', error);

    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 400,
      body: { error: error.message },
    };
  }
};

module.exports = postRoom;
