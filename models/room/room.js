const buildMakeRoom = ({ Id, roomValidator }) => {
  return function makeRoom({ id = Id.createId(), userIds = [], messages = [], type, chatInitiator }) {
    roomValidator({ id, userIds, messages, type, chatInitiator });

    return Object.freeze({
      getId: () => id,
      getUserIds: () => userIds,
      getMessages: () => messages,
      getType: () => type,
      getChatInitiator: () => chatInitiator,
    });
  };
};

module.exports = buildMakeRoom;
