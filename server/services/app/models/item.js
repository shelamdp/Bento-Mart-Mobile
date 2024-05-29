'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, {foreignKey: "categoryId"})
      Item.hasMany(models.Ingredient, {foreignKey: "itemId"})
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be null"
        },
        notNull: {
          msg: "Name cannot be null"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description cannot be null"
        },
        notNull: {
          msg: "Description cannot be null"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price cannot be null"
        },
        notNull: {
          msg: "Price cannot be null"
        },
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image Url cannot be null"
        },
        notNull: {
          msg: "Image Url cannot be null"
        },
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories"
      },
      onDelete: "CASCADE",
      onUpdate:"CASCADE"
    },
    mongoId: {
      type: DataTypes.STRING,
    }
  }, 
  {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};