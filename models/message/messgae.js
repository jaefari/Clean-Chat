const buildMakeRoom = ({ Id, messageValidator }) => {
  return function makeRoom({ id = Id.createId(), message, type, postedByUser }) {
    messageValidator({ id, message, type, postedByUser });

    return Object.freeze({
      getId: () => id,
      getMessage: () => message,
      getType: () => type,
      getPostedByUser: () => postedByUser,
    });
  };
};

module.exports = buildMakeRoom;
