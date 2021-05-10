const buildMakeUser = require('./user');

const Id = require('../../utils/id');
const buildValidator = require('../../utils/validator');
const userSchema = require('./userSchema');

const userValidator = buildValidator(userSchema);


const makeUser = buildMakeUser({ Id, userValidator });

module.exports = makeUser;
