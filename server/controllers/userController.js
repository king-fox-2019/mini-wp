const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
  static signUp(req, res, next) {
    const { name, email, password, image } = req.body;
    console.log(req.body.image);
    User.create({
      name,
      email,
      password,
      image
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
          response
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
                response
              });
            }
          }
        }
      })
      .catch(next);
  }

  static googleSignin(req, res, next) {
    // console.log("masuk google");
    // console.log(req.decoded);
    User.findOne({
      email: req.decoded.email
    })
      .then(response => {
        if (response) {
          return response;
        } else {
          return User.create({
            name: req.decoded.name,
            email: req.decoded.email,
            password: process.env.DEFAULT_PASSWORD,
            image: req.decoded.picture
          });
        }
      })
      .then(response => {
        // console.log(response);
        let payload = {
          id: response._id,
          name: response.name,
          email: response.email
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(201).json({
          token,
          response
        });
      })
      .catch(next);
  }
}

module.exports = UserController;
