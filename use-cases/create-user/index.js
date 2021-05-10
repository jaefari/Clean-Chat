const makeUser = require('../../models/user');

const buildCreateUser = ({ userDb }) => {
  if (!userDb) throw new Error('userDb is not provided');

  return async function createUser(userInfo) {
    const user = makeUser(userInfo);

    /* here I have access to user id to check authorization for example to
    check wheter user id of post is the same as is in request or not,
    if it is the same then user can edit post
    */

    // I could also add isAdmin in token for admmin auth checks

    await userDb.insert({
      id: user.getId(),
      username: user.getUsername(),
      password: user.getpPssword(),
      type: user.getType(),
    });

    return userDb.findById(user.getId());
  };
};

module.exports = buildCreateUser;
