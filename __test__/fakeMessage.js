// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const Id = require('../utils/id');

const fakeMessage = (overrides) => {
  const fake = {
    id: Id.createId(),
    message: faker.lorem.paragraph(),
    type: faker.random.arrayElement(['text']),
    postedByUser: Id.createId(),
  };

  return {
    ...fake,
    ...overrides,
  };
};

module.exports = fakeMessage;
