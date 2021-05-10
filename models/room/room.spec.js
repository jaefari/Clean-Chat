const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const makeRoom = require('.');
const fakeRoom = require('../../__test__/fakeRoom');


describe('models', () => {
  describe('room', () => {
    it('should not throw error for a valid payload', () => {
      const validPayload = fakeRoom();

      expect(() => makeRoom(validPayload)).to.not.throw();
    });

    it('should not throw error for a valid payload that has no id', () => {
      const invalidPayload = fakeRoom({ id: undefined });

      expect(() => makeRoom(invalidPayload)).to.not.throw('id');
    });

    it('should not throw error for an invalid payload that has no userIds', () => {
      const invalidPayload = fakeRoom({ userIds: undefined });

      expect(() => makeRoom(invalidPayload)).to.not.throw('userIds');
    });

    it('should not throw error for an invalid payload that has no message', () => {
      const invalidPayload = fakeRoom({ messages: undefined });

      expect(() => makeRoom(invalidPayload)).to.not.throw('messages');
    });

    it('should throw error for a invalid payload that has no type', () => {
      const invalidPayload = fakeRoom({ type: undefined });

      expect(() => makeRoom(invalidPayload)).to.throw('type');
    });

    it('should throw error for a invalid payload that has invalid type', () => {
      const invalidPayload = fakeRoom({ type: 'something' });

      expect(() => makeRoom(invalidPayload)).to.throw('type');
    });

    it('should throw error for a invalid payload that has no chatInitiator', () => {
      const invalidPayload = fakeRoom({ chatInitiator: undefined });

      expect(() => makeRoom(invalidPayload)).to.throw('chatInitiator');
    });
  });
});
