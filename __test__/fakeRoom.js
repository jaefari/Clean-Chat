// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const Id = require('../utils/id');

const fakeArticle = (overrides) => {
  const fake = {
    id: Id.createId(),
    userIds: [],
    messages: [],
    type: faker.random.arrayElement(['consumer-to-consumer', 'consumer-to-support']),
    chatInitiator: Id.createId(),
  };

  return {
    ...fake,
    ...overrides,
  };
};

module.exports = fakeArticle;
