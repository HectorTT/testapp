const controllerproducts = require("../controllers/productos.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
        app.post("/product", controllerproducts.createp);
        app.put("/product/:id", controllerproducts.updatep);
        app.delete("/product/:id", controllerproducts.deleteById);
        app.get("/product", controllerproducts.getallp);
        app.get("/product/:id", controllerproducts.getById);

};