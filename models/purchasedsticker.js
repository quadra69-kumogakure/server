'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchasedSticker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchasedSticker.belongsTo(models.User, {foreignKey : "UserId"});
      PurchasedSticker.belongsTo(models.Sticker, {foreignKey : "StickerId"});
    }
  }
  PurchasedSticker.init({
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
    StickerId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Sticker ID can't be empty"
        }, 
        notEmpty : {
          msg : "Sticker ID can't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'PurchasedSticker',
  });
  return PurchasedSticker;
};