const User = require('../model/User')
const { comparePassword } = require('../helper/bcryptjs')
const { generateToken } = require('../helper/jwt')
const passwordRandomizer = require('../helper/passwordRandomizer')

class UserController
{
    static test(req,res)
      {
          res.send('hello user connected')
      }


    static findAll(req,res,next)
      {
          User.find()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(next)
      }

    static register(req,res,next)
      {
          console.log('rea body', req.body)
          const { username, email, password } = req.body

          User.create({
              username,
              email,
              password
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(next)

      }
    
    
    static googleSignIn(req,res,next)
      {
        console.log('req.verifiedUser', req.verifiedUser)
        User.findOne({
          email:req.verifiedUser.email
        })
        .then(result=>{
          if(result)
            {
              console.log(1, result)
              const token = generateToken({ _id:result._id })
              res.status(200).json({ access_token : token})
            }
          else
            {
              User.create({
                username : req.verifiedUser.name,
                email: req.verifiedUser.email,
                password: passwordRandomizer()
              })
              .then(result=>{
                console.log(2, result)
                const token = generateToken({ _id:result._id})
                res.status(200).json({ username:result.username, access_token : token})

              })
              .catch(err=>{
                console.log(3, err)
                next()
              })
            }
          
        })
        .catch(err=>{
          next()
        })


      }


    static login(req,res,next)
      {
        const { email, password } = req.body
        console.log(email)
        User.findOne({
          email,
        })
        .then(result=>{
          if( comparePassword(password, result.password) )
            {
              const token = generateToken({ _id: result._id} )

              res.status(200).json( { username:result.username, access_token:token})
            }
          else
            {
              next({ status:403, message:'wrong email & password combination'})
            }
        })
        .catch(err=>{
          next({status:403, message:'email not found'})
        })


      }




}

module.exports = UserController