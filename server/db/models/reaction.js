'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reaction.belongsTo(models.message) //message.authorId
    }
  }
  reaction.init({
    reactorId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'reaction',
  });
  return reaction;
};
