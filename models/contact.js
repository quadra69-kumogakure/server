'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.User, {foreignKey : "UserId"});
      Contact.belongsTo(models.User, {foreignKey : "FriendId"});
    }
  }
  Contact.init({
    UserId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "User ID can't be empty"
        }, 
        notEmpty : {
          msg : "User ID can't be empty"
        }
      }
    },
    FriendId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Friend ID can't be empty"
        }, 
        notEmpty : {
          msg : "Friend ID can't be empty"
        }
      }
    },
    alias : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};