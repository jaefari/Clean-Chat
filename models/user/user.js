const buildMakeUser = ({ Id, userValidator }) => {
  return function makeUser({ id = Id.createId(), username, password, type }) {
    userValidator({ id, username, password, type });

    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getpPssword: () => password,
      getType: () => type,
    });
  };
};

module.exports = buildMakeUser;
