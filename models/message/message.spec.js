const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const makeMessage = require('.');
const fakeMessage = require('../../__test__/fakeMessage');


describe('models', () => {
  describe('message', () => {
    it('should not throw error for a valid payload', () => {
      const validPayload = fakeMessage();

      expect(() => makeMessage(validPayload)).to.not.throw();
    });

    it('should not throw error for a valid payload that has no id', () => {
      const invalidPayload = fakeMessage({ id: undefined });

      expect(() => makeMessage(invalidPayload)).to.not.throw('id');
    });

    it('should throw error for an invalid payload that has no message', () => {
      const invalidPayload = fakeMessage({ message: undefined });

      expect(() => makeMessage(invalidPayload)).to.throw('message');
    });

    it('should throw error for a invalid payload that has no type', () => {
      const invalidPayload = fakeMessage({ type: undefined });

      expect(() => makeMessage(invalidPayload)).to.throw('type');
    });

    it('should throw error for a invalid payload that has invalid type', () => {
      const invalidPayload = fakeMessage({ type: 'something' });

      expect(() => makeMessage(invalidPayload)).to.throw('type');
    });

    it('should throw error for an invalid payload that has no postedByUser', () => {
      const invalidPayload = fakeMessage({ postedByUser: undefined });

      expect(() => makeMessage(invalidPayload)).to.throw('postedByUser');
    });
  });
});
