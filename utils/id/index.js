const uuid = require('uuid');


const idValidator = (value, helpers) => {
  if (!uuid.validate(value)) return helpers.error('any.invalid');

  return value;
};

module.exports = Object.freeze({
  createId: () => uuid.v4(),
  idValidator,
});
