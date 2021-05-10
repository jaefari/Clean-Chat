// eslint-disable-next-line import/no-dynamic-require
const buildUserDb = require('./memory');
const database = require('../../utils/database');

const userDb = buildUserDb({ database: database.users });

module.exports = userDb;
