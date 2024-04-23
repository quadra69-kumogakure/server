'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Contact, {foreignKey : "UserId"});
      User.hasMany(models.Contact, {foreignKey : "FriendId"});
      User.hasMany(models.Message, {foreignKey : "SenderId"});
      User.hasMany(models.PurchasedSticker, {foreignKey : "UserId"});
      User.hasMany(models.Participants, {foreignKey : "UserId"});
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      unique : {
        args: true,
        msg : "Email is already in use!" 
      },
      validate : {
        isEmail : {
          msg : "Input must be in email format"
        }, 
        notNull : {
          msg : "Email can't be empty"
        },
        notEmpty : {
          msg : "Email can't be empty"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Password can't be empty"
        },
        notEmpty : {
          msg : "Password can't be empty"
        }, 
        isLong(value) {
          if (value.length < 5) {
            throw new Error("Password min length is 5")
          }
        }
      }
    },
    firstName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "First Name can't be empty"
        },
        notEmpty : {
          msg : "First Name can't be empty"
        }
      }
    },
    lastName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Last Name can't be empty"
        },
        notEmpty : {
          msg : "Last Name can't be empty"
        }
      }
    },
    profilePicture : {
      type : DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(instance, option) {
        const hash = hashPassword(instance.password);

        instance.password = hash;
      }
    }
  });
  return User;
};