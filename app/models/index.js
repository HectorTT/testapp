const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const DataTypes = require('sequelize/lib/data-types');
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.js")(sequelize, Sequelize);
db.role = require("../models/roles.js")(sequelize, Sequelize);
db.producto = require("../models/productos.js")(sequelize, Sequelize);
db.orden = require("../models/orden_compra.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


/* db.producto.belongsToMany(db.orden,{
    through: "producto_orden",
    foreignKey: "productoId",
    otherKey: "ordenId"
});
db.orden.belongsToMany(db.producto,{
  through: "producto_orden",
  foreignKey: "ordenId",
  otherKey: "productoId"
}); */

const Porductos_Orden = sequelize.define('producto_orden',{
  cantidad: DataTypes.INTEGER
},{timestamps: true});
db.producto.belongsToMany(db.orden,{ through: Porductos_Orden});
db.orden.belongsToMany(db.producto,{through: Porductos_Orden});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
