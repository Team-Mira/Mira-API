'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mention.belongsTo(models.message)
    }
  }
  mention.init({
    mentionedId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'mention',
  });
  return mention;
};