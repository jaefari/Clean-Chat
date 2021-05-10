// eslint-disable-next-line prefer-destructuring
const sendMessageInRoom = require('../../../use-cases').sendMessageInRoom; // for testing purpose it's MUCH better to prevent destrucying

const postMessage = async (httpRequest) => {
  const { ...messageInfo } = httpRequest.body;
  const { user } = httpRequest;

  messageInfo.postedByUser = user.id;

  try {
    const posted = await sendMessageInRoom(messageInfo);
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

module.exports = postMessage;
