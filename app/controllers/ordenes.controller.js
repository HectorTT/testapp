const db = require("../models");
const config = require("../config/auth.config");
const { hashSync } = require("bcryptjs");
const handleResponse = require('../helpers/handleResponse');
const { orden } = require("../models");
const { response } = require("express");
const { svccreateOrden } = require("../services/ordenes.service");
const ordenservice = require('../services/ordenes.service');
const ordenesService = require("../services/ordenes.service");
const Orden = db.orden;
const Producto = db.producto;
const Op = db.Sequelize.Op;

class OrdenesController {
    async createOrden (req, res) {

        let subtotal = 0;
        let total = 0;
        try {
            if ((req.body.productos).length > 0) {
                const iva = req.body.iva;
                const producto = req.body.productos;
/*                 const product = await Producto.findAll({
                    where: {
                    id: {
                        [Op.or]: req.body.productos
                    }
                    }
                });
                product.forEach(producto => {
                    subtotal = parseFloat(subtotal) + parseFloat(producto.precio);
                    total = total + (parseFloat((producto.precio * 1)) * (1+(req.body.iva / 100)));
                });

                const ordenes = await Orden.create({
                    total: total,//req.body.total,
                    subtotal: subtotal,//req.body.subtotal,
                    iva: req.body.iva,
                    //insert productos de la orden
                });
 */
                const response = await ordenservice.svccreateOrden(iva,producto);
                const result = {
                  message: "OK",
                  description: "Orden Creada",
                  response: response,
                }
                return handleResponse.success(result, res);
            }else{
                res.send({ message: "No se puede crear la orden sin productos!" });
            }
            
        }catch(error) {
            return handleResponse.error(error, res);
        }
    };
    
    async getallo (req, res) {
        try {
            const response = await ordenservice.svcgetallo();
            const result = {
              message: "OK",
              description: "Todas las Ordenes",
              Ordenes: response,
            }
            return handleResponse.success(result, res);
        }catch(error) {
            return handleResponse.error(error, res);
        }
    };
    
    async deleteByIdorden (req, res){
        try {
            const id = req.params.id;
            const response = await  ordenesService.svcdeleteByIdorden(id);
            const result = {
              message: "OK",
              description: "Orden Eliminada",
              response: response,
            }
            return handleResponse.success(result, res);
        }catch(error) {
            return handleResponse.error(error, res);
        }
    };
}
module.exports = new OrdenesController();

