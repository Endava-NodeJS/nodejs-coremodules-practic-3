const {UUID, UUIDV4, STRING} = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('notes', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    title: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    content: {
      type: STRING,
      allowNull: false,
    }
  });
};
