'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Report.init({
    products: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "List of Product cannot be empty"
        }
      }
    },
    transactions: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "List of Transaction cannot be empty"
        }
      }
    },
    income: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Must number"
        },
        notEmpty: {
          args: true,
          msg: "Cannot left empty"
        },
        notNegative(value) {
          if (parseInt(value) < 0 ) {
            throw new Error("Cannot be negative value")
          }
        },
      }
    },
    loss: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Must number"
        },
        notEmpty: {
          args: true,
          msg: "Cannot left empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};