const config = require('../config/sqlite.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

const db = {};

db.sequelize = sequelize;
db.notes = require('./notes.model.js')(sequelize);
db.users = require('./users.model.js')(sequelize);

module.exports = db;
