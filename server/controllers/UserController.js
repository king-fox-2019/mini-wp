const User = require('../models/User')
const {sign} = require('../helpers/token')
const {compare} = require('../helpers/bcrypt')
const axios = require('axios')

class UserController{

  // static githubLogin(req, res, next){
  //   axios({
  //     method: 'post',
  //     url: `https://github.com/login/oauth/access_token`,
  //     headers: {
  //       Accept: 'application/json'
  //     }
  //   })
  //     .then(({data}) => {
  //       return axios({
  //         method: 'get',
  //         url: `https://api.github.com/user/emails`,
  //         headers: {
  //           Authorization: 'token ' + data.access_token
  //         }
  //       })
  //     })
  //     .then(({data}) => {
  //       res.redirect('http://localhost:1234')
  //       // res.status(200).json({data.email})
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  static login(req, res, next){
    User.findOne({
      email: req.body.email
    })
      .then((data) => {
        if (data){
          if (compare(req.body.password, data.password)){
            let token = sign({
              userId: data._id
            })
            res.status(200).json(token)
          }
          else{
            throw new Error({
              code: 400,
              message: `Wrong email or password`
            })
          }
        }
        else {
          throw new Error({
            code: 400,
            message: `Wrong email or password`
          })
        }
      })
      .catch(next)
  }

  static register(req, res, next){
    let { email, password } = req.body
    User.create({ email, password })
      .then((data) => {
        let token = sign({
          userId: data._id
        })
        res.status(201).json(token)
      })
      .catch(next)
  }

}

module.exports = UserController