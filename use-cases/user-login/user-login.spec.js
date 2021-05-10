/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const buildCreateUser = require('../create-user');
const buildUserLogin = require('../user-login');

const fakeUser = require('../../__test__/fakeUser');

const buildUserDb = require('../../data-access/user-db/memory');
const database = require('../../utils/database');

const userDb = buildUserDb({ database: database.users });
const createUser = buildCreateUser({ userDb });
const userLogin = buildUserLogin({ userDb });


describe('use-cases', () => {
  describe('user-login', () => {
    it('should login and get token with valid username password', async () => {
      const user = await createUser(fakeUser());

      return expect(userLogin(user)).to.eventually.deep.equal(user);
    });

    it('should login and get token with unvalid username and/or password', async () => {
      const user = fakeUser();

      return expect(userLogin(user)).to.eventually.rejected;
    });
  });
});
