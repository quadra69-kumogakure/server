'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.hasMany(models.Participants, {foreignKey : "ConversationId", as: 'parti'});
      Conversation.hasMany(models.Message, {foreignKey : "ConversationId"});
      Conversation.belongsToMany(models.User, {through: models.Participants, foreignKey: "ConversationId"})
    }
  }
  Conversation.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};