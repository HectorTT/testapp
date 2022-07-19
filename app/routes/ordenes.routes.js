const controller = require("../controllers/ordenes.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
        app.get("/ordenes_compra", controller.getallo);
        app.delete("/ordenes_compra/:id", controller.deleteByIdorden);
        app.post("/ordenes_compra", controller.createOrden);/*
        app.put("/ordenes_compra/:id", controller.updatep);
        app.get("/ordenes_compra", controller.getallp);
        app.get("/ordenes_compra/:id", controller.getById); */

};