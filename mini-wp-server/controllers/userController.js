"use strict";

const User = require("../models/user");
const { validatePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { generatePassword } = require("../helpers/password");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static register(req, res, next) {
    console.log(req.body);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    user
      .save()
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static login(req, res, next) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          let err = {
            status: 404,
            msg: `Your email not match to any user's account`
          };
          next(err);
        } else if (validatePass(req.body.password, user.password)) {
          let payload = { id: user._id, email: user.email };
          let access_token = generateToken(payload);
          res.status(200).json(access_token);
        } else {
          let err = {
            status: 403,
            msg: "Email and/or password incorrect"
          };
          next(err);
        }
      })
      .catch(next);
  }

  static googleLogin(req, res, next) {
    let payload;
    client
      .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload();
        return User.findOne({ _id: payload.id });
      })
      .then(user => {
        if (!user) {
          let name = payload.email.split("@")[0];
          return User.create({
            name: name,
            email: payload.email,
            password: generatePassword()
          });
        }
      })
      .then(user => {
        payload = { id: user._id, email: user.email };
        let access_token = generateToken(payload);
        res.status(200).json(access_token);
      })
      .catch(next);
  }
}

module.exports = UserController;
