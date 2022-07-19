const db = require("../models");
const config = require("../config/auth.config");
const { hashSync } = require("bcryptjs");
const { orden } = require("../models");
const Orden = db.orden;
const Producto = db.producto;
const Op = db.Sequelize.Op;

exports.createOrden = (req, res) => {
    // Save User to Database
    let subtotal = 0;
    let total = 0;
    if ((req.body.productos).length > 0) {
        Producto.findAll({
            where: {
            id: {
                [Op.or]: req.body.productos
            }
            }
        }).then(productos => {
            //Recorre los productos de la orden y checa los precios para sumarlos a los totales para posteriormente actualizar la orden
            productos.forEach(producto => {
                subtotal = parseFloat(subtotal) + parseFloat(producto.precio);
                total = total + (parseFloat((producto.precio * 1)) * (1+(req.body.iva / 100)));
            });
            //res.send({productos: productos, total: total, subtotal: subtotal});
            Orden.create({
                total: total,//req.body.total,
                subtotal: subtotal,//req.body.subtotal,
                iva: req.body.iva,
                //insert productos de la orden
            }).then(orden => {
                orden.setProductos(productos).then(() => {
                });
                res.send({ message: "Orden Creada con exito!", productos: productos, orden: orden});
            });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }else{
        res.send({ message: "No se puede crear la orden sin productos!" });
    }
    
  };

  exports.getallo = (req, res) => {
    // Save User to Database
    Orden.findAll({ include: Producto })
      .then(orden => {
            res.send(orden);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.deleteByIdorden = (req, res) => {
    // Save User to Database
    Orden.destroy({ where: { id: req.params.id } })
        .then(orden => {
            res.send({ message: "Orden eliminada!" });
        })
        .catch((error) => {
            console.log(error);
        });
    };