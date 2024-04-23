'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sticker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sticker.hasMany(models.PurchasedSticker, {foreignKey : "StickerId"});
      Sticker.hasMany(models.Message, {foreignKey : "StickerId"});
    }
  }
  Sticker.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Title can't be empty!"
        }, 
        notEmpty : {
          msg : "Title can't be empty"
        }
      }
    },
    url: {
      type : DataTypes.STRING, 
      allowNull : false,
      validate : {
        notNull : {
          msg : "URL can't be empty!"
        }, 
        notEmpty : {
          msg : "URL can't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Sticker',
  });
  return Sticker;
};