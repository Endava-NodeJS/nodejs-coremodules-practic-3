const { UUID, UUIDV4, STRING } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("users", {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    username: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  });
