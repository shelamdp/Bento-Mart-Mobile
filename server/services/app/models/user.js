'use strict';

const bcrypt = require("bcryptjs")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty"
        },
        notNull: {
          msg: "Name cannot be empty"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email has been registered"
      },
      validate: {
        notEmpty: {
          msg: "Email cannot be empty"
        },
        notNull: {
          msg: "Email cannot be empty"
        },
        isEmail: {
          msg: "Email format invalidy"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty"
        },
        notNull: {
          msg: "Password cannot be empty"
        },
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        instance.password = bcrypt.hashSync(instance.password)
      }
    }
  });
  return User;
};