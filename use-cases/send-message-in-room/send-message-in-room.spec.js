/* eslint-disable no-unused-expressions */
const { describe, it, before } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const buildSendMessageInRoom = require('.');
const buildCreateRoom = require('../create-room');
const buildCreateUser = require('../create-user');

const fakeRoom = require('../../__test__/fakeRoom');
const fakeMessage = require('../../__test__/fakeMessage');
const fakeUser = require('../../__test__/fakeUser');

const buildRoomDb = require('../../data-access/room-db/memory');
const buildUserDb = require('../../data-access/user-db/memory');
const database = require('../../utils/database');

const roomDb = buildRoomDb({ database: database.rooms });
const userDb = buildUserDb({ database: database.users });
const createRoom = buildCreateRoom({ roomDb, userDb });
const sendMessageInRoom = buildSendMessageInRoom({ roomDb });
const createUser = buildCreateUser({ userDb });

describe('use-cases', () => {
  describe('send-message-in-room', () => {
    let room;
    let user;
    before(async () => {
      user = await createUser(fakeUser());
      room = await createRoom(fakeRoom({ chatInitiator: user.id }));
    });

    it('should add a message to room and return the whole room if user is allowed', async () => {
      const message = fakeMessage({ roomId: room.id, postedByUser: room.chatInitiator });

      return expect(sendMessageInRoom(message)).to.eventually.have.a.property('messages').with.lengthOf(1);
    });

    it('should throw error if user is not room initiator or in its userIds', async () => {
      const message = fakeMessage({ roomId: room.id });

      return expect(sendMessageInRoom(message)).to.eventually.rejected;
    });

    it('should throw error roomId does not exists', async () => {
      const message = fakeMessage({ roomId: 'something' });

      return expect(sendMessageInRoom(message)).to.eventually.rejected;
    });
  });
});
