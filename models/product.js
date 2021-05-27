'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, { through: 'Cart', foreignKey: 'ProductId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    barcode_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Barcode cannot be empty"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Must number"
        },
        notEmpty: {
          args: true,
          msg: "Stock is required"
        },
        notNegative(value) {
          if (parseInt(value) < 0 ) {
            throw new Error("Cannot be negative value")
          }
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Must number"
        },
        notEmpty: {
          args: true,
          msg: "Price is required"
        },
        notNegative(value) {
          if (parseInt(value) < 0 ) {
            throw new Error("Cannot be negative value")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};