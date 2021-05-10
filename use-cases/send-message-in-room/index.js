const makeRoom = require('../../models/room');
const makeMessage = require('../../models/message');

const buildSendMessageInRoom = ({ roomDb }) => {
  if (!roomDb) throw new Error('roomDb is not provided');

  return async function sendMessageInRoom(messageInfo) {
    const { roomId, type, message } = messageInfo;

    if (!roomId) throw new Error('roomId should be provided');
    if (!type) throw new Error('type should be provided');
    if (!message) throw new Error('message should be provided');

    const existingRoom = await roomDb.findById(roomId);
    if (!existingRoom) throw new Error('room not found');

    const room = makeRoom(existingRoom);

    // check user who has posted message is in room's userIds or it's chat initiator
    if (!room.getUserIds().includes(messageInfo.postedByUser)
        && room.getChatInitiator() !== messageInfo.postedByUser) {
      throw new Error('your user is neither this room\'s initiator nor in its allowed users');
    }


    const createdMessage = makeMessage(messageInfo);

    await roomDb.update({
      id: room.getId(),
      messages: room.getMessages().push({
        id: createdMessage.getId(),
        message: createdMessage.getMessage(),
        type: createdMessage.getType(),
        postedByUser: createdMessage.getPostedByUser(),
      }),
    });

    return roomDb.findById(room.getId());
  };
};

module.exports = buildSendMessageInRoom;
