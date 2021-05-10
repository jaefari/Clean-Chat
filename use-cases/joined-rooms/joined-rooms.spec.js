/* eslint-disable no-unused-expressions */
const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const buildCreateRoom = require('../create-room');
const buildCreateUser = require('../create-user');
const buildJoinRoom = require('../join-room');
const buildListJoinedRooms = require('.');

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
const listJoinedRooms = buildListJoinedRooms({ roomDb, userDb });

describe('use-cases', () => {
  describe('list-joined-rooms', () => {
    let room;
    let userWhoCreatesRoom;
    let userWhoJoinsRoom;
    beforeEach(async () => {
      userWhoCreatesRoom = await createUser(fakeUser());
      room = await createRoom(fakeRoom({ chatInitiator: userWhoCreatesRoom.id }));
      userWhoJoinsRoom = await createUser(fakeUser());
    });

    it('should consider rooms that user is the chat initiator', () => {
      return expect(listJoinedRooms(userWhoCreatesRoom.id)).to.eventually.be.an('array').that.has.lengthOf(1);
    });

    it('should consider rooms that user is not the chat initiator but is joined', async () => {
      await joinRoom({ userId: userWhoJoinsRoom.id, roomId: room.id });

      return expect(listJoinedRooms(userWhoJoinsRoom.id)).to.eventually.be.an('array').that.has.lengthOf(1);
    });
  });
});
