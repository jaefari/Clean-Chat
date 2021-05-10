const Joi = require('joi');

const { idValidator } = require('../../utils/id');

const roomSchema = Joi.object({
  id: Joi.string().required().custom(idValidator),
  userIds: Joi.array().required(),
  messages: Joi.array().required(),
  type: Joi.string().valid('consumer-to-consumer', 'consumer-to-support').required(),
  chatInitiator: Joi.string().required(),
});

module.exports = roomSchema;
