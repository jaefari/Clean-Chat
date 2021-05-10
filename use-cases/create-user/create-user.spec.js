/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const buildCreateUser = require('.');
const fakeUser = require('../../__test__/fakeUser');

const builduserDb = require('../../data-access/user-db/memory');
const database = require('../../utils/database');


const userDb = builduserDb({ database: database.users });
const createUser = buildCreateUser({ userDb });


describe('use-cases', () => {
  describe('create-user', () => {
    it('should create a user, and return created user', async () => {
      const payLoad = fakeUser();

      return expect(createUser(payLoad)).to.eventually.deep.equal(payLoad);
    });
  });
});
