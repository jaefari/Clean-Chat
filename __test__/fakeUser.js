// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const Id = require('../utils/id');

const fakeUser = (overrides) => {
  const fake = {
    id: Id.createId(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    type: faker.random.arrayElement(['support', 'consumer']),
  };

  return {
    ...fake,
    ...overrides,
  };
};

module.exports = fakeUser;
