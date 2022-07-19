const db = require("../models");
const config = require("../config/auth.config");
const handleResponse = require('../helpers/handleResponse');
const Producto = db.producto;
const productoservice = require('../services/productos.service');
const Op = db.Sequelize.Op;

class ProductController {
  constructor () {} 
  async createp (req, res) {
    const payload = {
      nombre: req.body.nombre,
      cantidad: req.body.cantidad,
      precio:  req.body.precio
    };
    try {
      const response = await productoservice.createproduct(payload);
      const result = {
        message: "OK",
        description: "Prodcto Registrado",
        producto: response,
      }
      return handleResponse.success(result, res);
    }catch(error) {
      return handleResponse.error(error, res);
    }
  };
  
  async updatep  (req, res) {
    try {
      const payload = {
        nombre: req.body.nombre,
        cantidad: req.body.cantidad,
        precio:  req.body.precio
      };
      const id = req.params.id;
      const response = await productoservice.updateproduct(id,payload);
      const result = {
        message: "OK",
        description: "Prodcto Actualizado",
        producto: response,
      }
      return handleResponse.success(result, res);
    }catch(error) {
      return handleResponse.error(error, res);
    }
  };
  
  async getallp(req, res) {
    try {
      const response = await productoservice.getallproduct();

      const result = {
        message: "OK",
        description: "Opteniendo todos los productos",
        producto: response,
      }
      return handleResponse.success(result, res);
    }catch(error) {
      return handleResponse.error(error, res);
    }
  };
  
  async getById (req, res) {
    // Save User to Database
    try {
      const response = await productoservice.getByIdproduct(req.params.id);

      const result = {
        message: "OK",
        description: "Opteniendo producto",
        producto: response,
      }
      return handleResponse.success(result, res);
    }catch(error) {
      return handleResponse.error(error, res);
    }
  };
  
  async deleteById (req, res){
      // Save User to Database
      try{
        const response = await productoservice.deleteByIdproduct(req.params.id); 

        const result = {
          message: "Elimnado",
          description: "El producto se elimino con exito",
          outPut: response,
        }
        return handleResponse.success(result, res);
      }catch(error) {
        return handleResponse.error(error, res);
      }
  };
      
}
module.exports = new ProductController();