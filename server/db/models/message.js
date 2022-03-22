'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.hasMany(models.mention)
      message.hasMany(models.reaction)
    }

  }
  message.init({
    id: {
      type:DataTypes.BIGINT,
    primaryKey: true},
    userId: DataTypes.BIGINT,
    channelId: DataTypes.BIGINT,
    serverId: DataTypes.BIGINT,
    content:{ 
      type:DataTypes.STRING,
    allowNull:false},
    isReply: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    repliedUserId: {
      type: DataTypes.BIGINT
    },
    mentionedEveryone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};