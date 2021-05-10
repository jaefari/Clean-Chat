const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const makeUser = require('.');
const fakeUser = require('../../__test__/fakeUser');


describe('models', () => {
  describe('user', () => {
    it('should not throw error for a valid payload', () => {
      const validPayload = fakeUser();

      expect(() => makeUser(validPayload)).to.not.throw();
    });

    it('should not throw error for a valid payload that has no id', () => {
      const invalidPayload = fakeUser({ id: undefined });

      expect(() => makeUser(invalidPayload)).to.not.throw('id');
    });

    it('should throw error for an invalid payload that has no username', () => {
      const invalidPayload = fakeUser({ username: undefined });

      expect(() => makeUser(invalidPayload)).to.throw('username');
    });

    it('should throw error for an invalid payload that has no password', () => {
      const invalidPayload = fakeUser({ password: undefined });

      expect(() => makeUser(invalidPayload)).to.throw('password');
    });

    it('should throw error for a invalid payload that has no type', () => {
      const invalidPayload = fakeUser({ type: undefined });

      expect(() => makeUser(invalidPayload)).to.throw('type');
    });

    it('should throw error for a invalid payload that has invalid type', () => {
      const invalidPayload = fakeUser({ type: 'something' });

      expect(() => makeUser(invalidPayload)).to.throw('type');
    });
  });
});
