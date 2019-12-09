const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("../helpers/jsonwebtoken");
const passwordGenerator = require("../helpers/passwordGenerator");

class UserController {
  static register(req, res, next) {
    const docs = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    User.create(docs)
      .then(user => {
        const payload = {
          _id: user._id
        };
        const token = jsonwebtoken.generateToken(payload);
        res.status(201).json({ token });
      })
      .catch(err => {
        console.log(err);
        res.status(422).json({ message: err.errors });
      });
  }
  static login(req, res, next) {
    const condition = {
      email: req.body.email
    };
    User.findOne(condition)
      .then(user => {
        if (user) {
          const password = req.body.password;
          const match = bcrypt.compareSync(password, user.password);
          if (match) {
            const payload = {
              _id: user._id
            };
            const token = jsonwebtoken.generateToken(payload);
            res.status(200).json({ token });
          } else {
            res.status(400).json({ message: "Wrong password" });
          }
        } else {
          res.status(400).json({ message: "User not found" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  }
  static googleLogin(req, res, next) {
    const { gProfile } = req.body;
    const condition = {
      email: gProfile.U3
    };
    User.findOne(condition)
      .then(user => {
        if (user) {
          const payload = { _id: user._id };
          const token = jsonwebtoken.generateToken(payload);
          res.status(200).json(token);
        } else {
          const password = passwordGenerator();
          const docs = {
            name: gProfile.ig,
            email: gProfile.U3,
            password
          };
          return User.create(docs);
        }
      })
      .then(user => {
        const payload = { _id: user._id };
        const token = jsonwebtoken.generateToken(payload);
        res.status(201).json(token);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = UserController;
