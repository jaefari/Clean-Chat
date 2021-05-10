/* eslint-disable no-unused-expressions */
const { describe, it, before } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const fakeUser = require('../../__test__/fakeUser');
const buildUserDb = require('../user-db/memory');
const database = require('../../utils/database');

const userDb = buildUserDb({ database: database.users });

describe('data-access', () => {
  describe('user-db', () => {
    it('inserts to database', () => {
      return expect(userDb.insert(fakeUser())).to.not.eventually.rejected;
    });

    it('finds by id', async () => {
      const user = fakeUser();
      await userDb.insert(user);

      return expect(userDb.findById(user.id)).to.eventually.be.an('object').and.deep.eq(user);
    });

    it('finds by params', async () => {
      const user = fakeUser();
      await userDb.insert(user);

      return expect(userDb.findByParams({ username: user.username, password: user.password })).to.eventually.be.an('object').and.deep.eq(user);
    });

    it('finds by params should act like an AND so throw error if parameter is not included in user,', async () => {
      const user = fakeUser();
      await userDb.insert(user);

      return expect(userDb.findByParams({ username: user.username, password: user.password, something: 'something' })).to.eventually.be.rejected;
    });
  });
});
