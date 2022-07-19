'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orden_compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orden_compra.init({
    total: DataTypes.DECIMAL,
    subtotal: DataTypes.DECIMAL,
    iva: DataTypes.INTEGER,
    producto: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'orden_compra',
  });
  return orden_compra;
};