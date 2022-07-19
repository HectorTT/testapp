const Productos = require('../models/producto.dao');
var ProductoDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateProducto: updateProducto
}



function findById(id) {
    return Productos.findByPk(id);
}

function findAll() {
    return Productos.findAll();
}

function deleteById(id) {
    return Productos.destroy({ where: { id: id } });
}

function create(producto) {
    var newProducto = new Productos(producto);
    return newProducto.save();
}

function updateProducto(producto, id) {
    var updateProducto = {
        title: producto.title,
        technologies: producto.description
    };
    return Productos.update(updateProducto, { where: { id: id } });
}
module.exports = ProductoDao;