const buildMakeMessage = require('./messgae');

const Id = require('../../utils/id');
const buildValidator = require('../../utils/validator');
const messageSchema = require('./messageSchema');

const messageValidator = buildValidator(messageSchema);


const makeMessage = buildMakeMessage({ Id, messageValidator });

module.exports = makeMessage;
