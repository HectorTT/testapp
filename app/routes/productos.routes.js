const controller = require("../controllers/productos.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
        app.post("/product", controller.createp);
        app.put("/product/:id", controller.updatep);
        app.delete("/product/:id", controller.deleteById);
        app.get("/product", controller.getallp);
        app.get("/product/:id", controller.getById);

};