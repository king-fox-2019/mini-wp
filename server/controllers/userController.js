const User = require("../models/user");
const { generateToken } = require("../helpers/jwt");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class userController {
  static register = (req, res, next) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(user => {
      console.log(user)
      let access_token = generateToken({id:user.id});
      res.status(201).json(access_token);
    })
    .catch(err => next(err));
  };
  static login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if(user.password===req.body.password){
          let access_token = generateToken({id:user.id})
          res.status(201).json(access_token)
        }
        else throw {name:'400',message:'wrong password'}
      }else throw {name:'404',message:'user not found'}
    })
    .catch(err=>next(err));
  };
  static googleSignIn = (req,res,next) => {
    console.log(req.body)
    let email,name
    client.verifyIdToken({
      idToken:req.body.token,
      audience:process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket=>{
      email=ticket.getPayload().email
      name=ticket.getPayload().name
      return User.findOne({email})
    })
    .then(user=>{
      if(user){
        return user._id
      }else{
        User.create({
          username:name,
          email,
          password:'google'
        })
      }
    })
    .then(userId=>{
      let access_token = generateToken({id:userId})
      res.status(201).json(access_token)
    })
    .catch(err=>next(err))
  }
}

module.exports = userController;
