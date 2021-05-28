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
      Report.hasMany(models.Product, { foreignKey: 'ProductId'})
      Report.hasMany(models.Product, { foreignKey: 'stockRecorded'})
    }
  };
  Report.init({
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    stockRecorded:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'stock'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    stockReality: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};