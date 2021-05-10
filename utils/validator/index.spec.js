const Joi = require('joi');

const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { expect } = chai;

const buildValidator = require('.');

const sampleSchema = Joi.object({
  name: Joi.string().required(),
});

const sampleValidator = buildValidator(sampleSchema);

describe('validator', () => {
  it('should return true for a valid object', () => {
    const validObj = { name: 'abbas' };

    expect(sampleValidator(validObj)).to.eq(true);
  });

  it('should throw error for an invalid object', () => {
    const invalidObj = {};

    expect(() => sampleValidator(invalidObj)).to.throw();
  });
});
