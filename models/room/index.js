const buildMakeRoom = require('./room');

const Id = require('../../utils/id');
const buildValidator = require('../../utils/validator');
const roomSchema = require('./roomSchema');

const roomValidator = buildValidator(roomSchema);


const makeRoom = buildMakeRoom({ Id, roomValidator });

module.exports = makeRoom;
