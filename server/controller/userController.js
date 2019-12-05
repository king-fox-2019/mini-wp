const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')

class userController {
    static register = (req,res,next) => {
        User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        .then(user=>{
            let access_token = generateToken({id:user._id})
            res.status(201).json({access_token})
        })
        .catch(err=>next(err))
    }
    static login = (req,res,next) => {
        User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                if(comparePassword(req.body.password,user.password)){
                    let access_token = generateToken({id:user._id})
                    res.status(200).json({access_token})
                }
                else throw {name:'404',message:'wrong password'}
            }
            else throw {name:"404",message:"user not found"}
        })
        .catch(err=>next(err))
    }
}

module.exports = userController