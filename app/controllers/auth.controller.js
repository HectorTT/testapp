const db = require("../models");
const config = require("../config/auth.config");
const handleResponse = require('../helpers/handleResponse');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authService = require("../services/auth.service");
class AuthController {
  constructor () {} 
  async signup (req, res) {
    // Save User to Database
    try {
      const payload ={
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }
      const roles = req.body.roles;
      const response = await authService.svcsignup(payload,roles);
      const result = {
        message: "OK",
        description: "Usuario registrado",
        user: payload.username,
        roles: roles,
        response: response,
      }
      return handleResponse.success(result, res);
      /* const user = await  User.create({
        
      });
      if (req.body.roles) {
        const roles = await Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        });
          const response = await user.setRoles(roles);
          const result = {
          message: "OK",
          description: "Usuario registrado",
          user: user,
          roles: roles,
          response: response,
        }
        return handleResponse.success(result, res);
      } else {
        // user role = 1
        const response = await user.setRoles([1]);
        const result = {
          message: "OK",
          description: "Usuario registrado",
          user: user,
          roles: 1,
          response: response,
        }
        res.send({ message: result });
      }
      return handleResponse.success(result, res);   */
    }catch(error) {
      return handleResponse.error(error, res);
    }
  };

  async signin (req, res) {
    
    try {
      const payload = {username: req.body.email, password: req.body.password};
      const response = await authService.svcsignin(payload);

      return handleResponse.success(response, res);
    }catch(error) {
      return handleResponse.error(error, res);
    }
  };
}
module.exports = new AuthController();
