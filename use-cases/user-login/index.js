const buildCreateRoom = ({ userDb }) => {
  if (!userDb) throw new Error('userDb is not provided');

  return async function createRoom(userInfo) {
    const { username, password } = userInfo;

    if (!username) throw new Error('username is not provided');
    if (!password) throw new Error('password is not provided');

    return userDb.findByParams({
      username,
      password,
    });
  };
};

module.exports = buildCreateRoom;
