const buildRoomDb = require('./memory');
const database = require('../../utils/database');

const roomDb = buildRoomDb({ database: database.rooms });

module.exports = roomDb;
