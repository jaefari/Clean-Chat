// eslint-disable-next-line prefer-destructuring
const createUser = require('../../../use-cases').createUser; // for testing purpose it's MUCH better to prevent destrucying

const postUser = async (httpRequest) => {
  const { ...userInfo } = httpRequest.body;
  // userInfo.user = httpRequest.user;

  try {
    const posted = await createUser(userInfo);
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

module.exports = postUser;
