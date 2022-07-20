const db = require("../models");
const config = require("../config/auth.config");
const handleResponse = require('../helpers/handleResponse');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
class AuthService {
    constructor () {} 
  async svcsignup (payload,rols) {
    // Save User to Database
    try {
      const user = await  User.create(payload);
      if (rols) {
        const roles = await Role.findAll({
          where: {
            name: {
              [Op.or]: rols
            }
          }
        });
          return await user.setRoles(roles);
        //return handleResponse.success(result, res);
      } else {
        // user role = 1
        return await user.setRoles([1]);
      }
    }catch(error) {
      return handleResponse.error(error, res);
    }
  };

  async svcsignin (payload) {
    try {
      
      const user = await User.findOne({
        where: {
            email: payload.username
        }
      });
      //res.send({ message: "Holi!" });
      if (!user) {
        return ({message: "User Not found."});
      }
      let passwordIsValid = bcrypt.compareSync(
        payload.password,
        user.password
      );
      if (!passwordIsValid) {
        return ({accessToken: null, message: "Invalid Password!"});
      }
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      let authorities = [];

      const roles = await user.getRoles();
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      const result = {
        message: "OK",
        description: "Usuario registrado",
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      }

      return result;
    }catch(error) {
      return handleResponse.error(error, res);
    }
  };
}
module.exports = new AuthService();
