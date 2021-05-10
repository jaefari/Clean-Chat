const { verify } = require('../../../utils/auth');

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw new Error('authorization token is not provided in body');
    const payload = await verify(token);
    const { id } = payload;
    req.user = { id };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddleware,
};
