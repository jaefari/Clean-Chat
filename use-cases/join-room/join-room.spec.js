/* eslint-disable no-unused-expressions */
const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const buildCreateRoom = require('../create-room');
const buildCreateUser = require('../create-user');
const buildJoinRoom = require('../join-room');

const fakeRoom = require('../../__test__/fakeRoom');
const fakeUser = require('../../__test__/fakeUser');

const buildRoomDb = require('../../data-access/room-db/memory');
const buildUserDb = require('../../data-access/user-db/memory');
const database = require('../../utils/database');


const roomDb = buildRoomDb({ database: database.rooms });
const userDb = buildUserDb({ database: database.users });
const createRoom = buildCreateRoom({ roomDb, userDb });
const createUser = buildCreateUser({ userDb });
const joinRoom = buildJoinRoom({ roomDb, userDb });


describe('use-cases', () => {
  describe('join-room', () => {
    let room;
    let userWhoCreatesRoom;
    let userWhoJoinsRoom;
    beforeEach(async () => {
      userWhoCreatesRoom = await createUser(fakeUser());
      room = await createRoom(fakeRoom({ chatInitiator: userWhoCreatesRoom.id }));
      userWhoJoinsRoom = await createUser(fakeUser());
    });

    it('user should be able to join the room if not joined before', () => {
      return expect(joinRoom({ userId: userWhoJoinsRoom.id, roomId: room.id })).to.eventually.have.a.property('userIds').with.lengthOf(1);
    });

    it('throw error if user has joined before', async () => {
      await joinRoom({ userId: userWhoJoinsRoom.id, roomId: room.id });

      return expect(joinRoom({ userId: userWhoJoinsRoom.id, roomId: room.id })).to.eventually.rejected;
    });

    it('throw error if user is the chat initiator', async () => {
      return expect(joinRoom({ userId: userWhoCreatesRoom.id, roomId: room.id })).to.eventually.rejected;
    });
  });
});
