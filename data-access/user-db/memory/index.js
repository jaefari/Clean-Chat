const buildUserDb = ({ database }) => {
  const insert = async (userInfo) => {
    database.push(userInfo);
    return userInfo;
  };

  const findById = async (id) => {
    const user = database.filter((c) => c.id === id);
    if (user.length > 0) return user[0];
    throw new Error('user not found');
  };

  const findByParams = async (params) => {
    const user = database.filter((e) => Object.keys(params).every((k) => params[k] === e[k]));

    if (user.length > 0) return user[0];
    throw new Error('user not found');
  };

  return Object.freeze({
    insert,
    findById,
    findByParams,
  });
};

module.exports = buildUserDb;
