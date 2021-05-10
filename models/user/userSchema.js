const Joi = require('joi');

const { idValidator } = require('../../utils/id');

const articleSchema = Joi.object({
  id: Joi.string().required().custom(idValidator),
  username: Joi.string().required(),
  password: Joi.string().required(),
  type: Joi.string().valid('consumer', 'support').required(),
});

module.exports = articleSchema;
