const db = require("../models");
const config = require("../config/auth.config");
const Producto = db.producto;
const Op = db.Sequelize.Op;

class ProductService {
  constructor () {} 
    /**
   *
   * @param {*} payload Modelo basado en la entidad de la base de datos
   * @returns
   */

  async createproduct (payload) {

    try {
      return await  Producto.create(
        payload
      );
    }catch(error) {
        throw error;
    }
  };
  
  async updateproduct(id, payload) {
    try {
      return await Producto.update(payload, {
        where: {
          id: id
        }
      });
    }catch(error) {
        throw error;
    }
  };
  
  async getallproduct() {
    try {
      return await Producto.findAll();
    }catch(error) {
        throw error;
    }
  };
  
  async getByIdproduct (id) {
    // Save User to Database
    try {
      return await Producto.findByPk(id);
    }catch(error) {
        throw error;
    }
  };
  
  async deleteByIdproduct (id){
      // Save User to Database
      try{
        return await Producto.destroy({ where: { id: id } });
      }catch(error) {
        throw error;
      }
  };
      
}
module.exports = new ProductService();