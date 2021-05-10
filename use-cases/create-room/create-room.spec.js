/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const buildCreateRoom = require('.');
const buildCreateUser = require('../create-user');
const fakeRoom = require('../../__test__/fakeRoom');
const fakeUser = require('../../__test__/fakeUser');

const buildRoomDb = require('../../data-access/room-db/memory');
const buildUserDb = require('../../data-access/user-db/memory');
const database = require('../../utils/database');


const roomDb = buildRoomDb({ database: database.rooms });
const userDb = buildUserDb({ database: database.users });
const createRoom = buildCreateRoom({ roomDb, userDb });
const createUser = buildCreateUser({ userDb });


describe('use-cases', () => {
  describe('create-room', () => {
    it('should create a room, and return created room', async () => {
      const user = fakeUser();
      await createUser(user);

      const room = fakeRoom({ chatInitiator: user.id });

      return expect(createRoom(room)).to.eventually.deep.equal(room);
    });

    it('should throw error if initiator user does not exist in database', async () => {
      const user = fakeUser();
      const payLoad = fakeRoom({ chatInitiator: user.id });

      return expect(createRoom(payLoad)).to.eventually.rejected;
    });
  });
});
