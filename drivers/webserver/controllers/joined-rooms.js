// eslint-disable-next-line prefer-destructuring
const joinedRooms = require('../../../use-cases').joinedRooms; // for testing purpose it's MUCH better to prevent destrucying

const getJoinedRooms = async (httpRequest) => {
  // const { ...userInfo } = httpRequest.body;
  const { user } = httpRequest;

  try {
    const roomIds = await joinedRooms(user.id);

    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 201,
      body: { roomIds },
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

module.exports = getJoinedRooms;
