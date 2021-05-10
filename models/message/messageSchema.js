const Joi = require('joi');

const { idValidator } = require('../../utils/id');

const roomSchema = Joi.object({
  id: Joi.string().required().custom(idValidator),
  message: Joi.string().required(),
  type: Joi.string().valid('text').required(),
  postedByUser: Joi.string().required().custom(idValidator),
});

module.exports = roomSchema;
