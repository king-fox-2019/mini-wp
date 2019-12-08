const { User, Article } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { ObjectId } = require('mongodb');

class userController {
  static signup(req, res, next) {
    const { username, email, password } = req.body;
    console.log(req.body)
    User.create({ username, email, password })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  static signin(req, res, next) {
    const payload = {};
    let access_token = '';
    const { email, password } = req.body;
    console.log(req.body, '<<<<<<<,')
    User.findOne({ email })
      .then(user => {
        if (user) {
          if (checkPassword(password, user.password)) {
            payload._id = user._id;
            payload.email = user.email;
            access_token = generateToken(payload);
            res.status(200).json({ access_token, email })
          } else {
            throw { status: 401, message: "Invalid password" }
          }
        } else {
          throw { status: 401, message: "Email is not registered" }
        }
      })
      .catch(next)
      
    }
    
  static signinGoogle(req, res, next) {
    let payload = {};
    let access_token = '';
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload();
        return User.findOne({ email: payload.email })
      })
      .then(user => {
        if (user) {
          return user;
        } else {
          return User.create({
            email: payload.email,
            username: payload.name.split(' ').join('') + Date.now(),
            password: payload.jti,
            gSignIn: true
          })
        }
      })
      .then(user => {
        payload._id = user._id;
        payload.email = user.email;
        access_token = generateToken(payload);
        res.status(200).json({ access_token })
      })
      .catch(next)    
  }

  static getUser(req, res, next) {
    User.findById(req.params.userId)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
      
  }


  static showArticles(req, res, next) {

    console.log(ObjectId(req.decoded._id))
    Article.find({ author: { _id: ObjectId(req.decoded._id) } }).sort({created_at: 'descending'})
    .populate("articles")
    .then(articles => {
      
      console.log(articles)
        res.status(200).json(articles);
      })
      .catch(next)
  }

  // static editUser(req, res, next) {
  //   const userId = req.params.userId;
  //   const { username, email, password } = req.body;
  //   User.findByIdAndUpdate(userId, { username, email, password }, { runValidators: true, context: 'query' })
  //     .then(response => {
  //       res.status(200).json({ message: 'Updated' })
  //     })
  //     .catch(next);
  // }

  // static editUserSpecified(req, res, next) {
  //   const update = {};
  //   const { userId } = req.params;
  //   const { username, email, password } = req.body;
  //   if (username) update.username = username;
  //   if (email) update.email = email;
  //   if (password) update.password = password;
  //   User.findByIdAndUpdate(userId, update)
  //     .then(user => {
  //       res.status(200).json({ message: 'Updated' })
  //     })
  //     .catch(next);

  // }


  // static deleteUser(req, res, next) {
  //   const userId = req.params.userId;
  //   User.findByIdAndDelete(userId)
  //     .then(response => {
  //       return res.status(200).json({ message: 'Deleted' })
  //     })
  //     .catch(next({ status: 404, message: "User does not exist"}))
  // }

}

module.exports = userController;