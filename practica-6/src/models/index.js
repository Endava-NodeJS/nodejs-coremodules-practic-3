const config = require('../config/sqlite.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

const notes = require('./notes.model.js')(sequelize);
const users = require('./users.model.js')(sequelize);

const db = {
    sequelize,
    notes,
    users,
};

module.exports = db;
