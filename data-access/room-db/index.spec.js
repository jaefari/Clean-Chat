/* eslint-disable no-unused-expressions */
const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const fakeRoom = require('../../__test__/fakeRoom');

const buildRoomDb = require('../room-db/memory');
const database = require('../../utils/database');

const roomDb = buildRoomDb({ database: database.rooms });

describe('data-access', () => {
  describe('room-db', () => {
    it('inserts to database', () => {
      return expect(roomDb.insert(fakeRoom())).to.not.eventually.rejected;
    });

    it('finds by id', async () => {
      const room = fakeRoom();
      await roomDb.insert(room);

      return expect(roomDb.findById(room.id)).to.eventually.be.an('object').and.deep.eq(room);
    });

    it('finds by id', async () => {
      const room = fakeRoom();
      await roomDb.insert(room);

      return expect(roomDb.findById(room.id)).to.eventually.be.an('object').and.deep.eq(room);
    });

    it('lists joined rooms of user', async () => {
      const room = fakeRoom();
      await roomDb.insert(room);

      return expect(roomDb.joinedRooms(room.chatInitiator)).to.eventually.be.an('array').that.has.lengthOf(1);
    });
  });
});
