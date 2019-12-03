const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
  static signUp(req, res, next) {
    const { name, email, password } = req.body;
    User.create({
      name,
      email,
      password
    })
      .then(response => {
        let payload = {
          id: response._id,
          email: response.email,
          name: response.name
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(201).json({
          token,
          user: payload.name,
          message: `Success SignUp, Welcome ${payload.name}`
        });
      })
      .catch(next);
  }

  static signIn(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      email
    })
      .then(response => {
        if (!response) {
          throw {
            status: 404,
            message: "Email / Password is Wrong!"
          };
        } else {
          if (password === "" || password === null) {
            throw {
              status: 404,
              message: "Password Required"
            };
          } else {
            if (!comparePassword(password, response.password)) {
              throw {
                status: 404,
                message: "Username / Password is Wrong!"
              };
            } else {
              let payload = {
                id: response._id,
                email: response.email,
                name: response.name
              };
              let token = jwt.sign(payload, process.env.JWT_SECRET);
              res.status(200).json({
                token,
                user: payload.name,
                message: "Success SignIn"
              });
            }
          }
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
