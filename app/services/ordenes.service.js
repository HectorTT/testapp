const db = require("../models");
const config = require("../config/auth.config");
const { hashSync } = require("bcryptjs");
const { orden } = require("../models");
const { response } = require("express");
const Orden = db.orden;
const Producto = db.producto;
const Op = db.Sequelize.Op;

class OrdenesService {
    constructor () {} 
    async svccreateOrden (iva, productos) {
        let subtotal = 0;
        let total = 0;
        try {
            if ((productos).length > 0) {
                const product = await Producto.findAll({
                    where: {
                    id: {
                        [Op.or]: productos
                    }
                    }
                });
                if(product.length > 0) {
                    product.forEach(producto => {
                        subtotal = parseFloat(subtotal) + parseFloat(producto.precio);
                        total = total + (parseFloat((producto.precio * 1)) * (1+(iva / 100)));
                    });
    
                    const ordenes = await Orden.create({
                        total: total,//req.body.total,
                        subtotal: subtotal,//req.body.subtotal,
                        iva: iva,
                        //insert productos de la orden
                        
                    });
                    console.info(product);
                    return await ordenes.addProductos(product , { through: { cantidad: 5 } });
                }else{
                    return ({message: "Producto not found"});
                }
                
            }else{
                res.send({ message: "No se puede crear la orden sin productos!" });
            }
            
        }catch(error) {
            throw error;
        }
    };
    
    async svcgetallo () {
        try {
            return await Orden.findAll({ include: Producto });
        }catch(error) {
            throw error;
        }
    };
    
    async svcdeleteByIdorden (id){
        try {
            return await Orden.destroy({ where: { id: id } });
        }catch(error) {
            throw error;
        }
    };
}
module.exports = new OrdenesService();

