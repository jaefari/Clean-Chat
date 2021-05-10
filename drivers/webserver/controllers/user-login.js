// eslint-disable-next-line prefer-destructuring
const userLogin = require('../../../use-cases').userLogin; // for testing purpose it's MUCH better to prevent destrucying
const { sign } = require('../../../utils/auth');

const getToken = async (httpRequest) => {
  const { ...userInfo } = httpRequest.body;
  // userInfo.user = httpRequest.user;

  try {
    const user = await userLogin(userInfo);
    const token = await sign({ id: user.id });

    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 201,
      body: { token },
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

module.exports = getToken;
