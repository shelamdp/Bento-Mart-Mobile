'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ingredient.belongsTo(models.Item, {foreignKey: "itemId"})
    }
  }
  Ingredient.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Ingredients cannot be null"
        },
        notNull: {
          msg: "Ingredients cannot be null"
        }
      }
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Items"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};