const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("../helpers/bcrypt")

class userController {
  static allUsers(req, res, next) {
    User.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next)
  }

  static signin(req, res, next) {

  }


  static register(req, res, next) {
    console.log(req.body)
    const { username, email, password } = req.body;
    User.create({ username, email, password })
      .then(user => {
        console.log("ya")
        res.status(200).json("Successfully created!");
      }) 
      .catch(next);
  }

  static editUser(req, res, next) {
    console.log(req.body)
    const { username, email, password } = req.body;
    User.findByIdAndUpdate(req.params.userId, { username, email, password })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next);
  }

  static userInfo(req, res, next) {
    User.findById(req.params.userId)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(next);
  }

  static deleteUser(req, res, next) {
    User.findByIdAndDelete(req.params.userId)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next)
    
  }
}

module.exports = userController;