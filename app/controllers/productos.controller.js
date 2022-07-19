const db = require("../models");
const config = require("../config/auth.config");
const Producto = db.producto;
const Op = db.Sequelize.Op;
exports.createp = (req, res) => {
  // Save User to Database
  Producto.create({
    nombre: req.body.nombre,
    cantidad: req.body.cantidad,
    precio:  req.body.precio
  })
    .then(producto => {
          res.send({ message: "Producto Registrado!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updatep = (req, res) => {
    // Save User to Database
    Producto.update({ 
        nombre: req.body.nombre,
        cantidad: req.body.cantidad,
        precio:  req.body.precio
    }, {
        where: {
          id: req.params.id
        }
      })
      .then(producto => {
            res.send({ message: "Producto Actualizado!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.getallp = (req, res) => {
    // Save User to Database
    Producto.findAll()
      .then(producto => {
            res.send(producto);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.getById = (req, res) => {
// Save User to Database
    Producto.findByPk(req.params.id).
    then((data) => {
        res.send(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.deleteById = (req, res) => {
    // Save User to Database
        Producto.destroy({ where: { id: req.params.id } })
        .then(producto => {
            res.send({ message: "Producto eliminado!" });
        })
        .catch((error) => {
            console.log(error);
        });
    };