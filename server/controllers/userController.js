const User = require('../models/User')
const {PasswordHasher,VerifyPassword} = require('../helpers/passwordGenerator')
const {generateToken} = require('../helpers/tokenGenerator')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLINT_ID);


class UserController {
    static findAll(req,res,next){
        User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            next(err)
        })
    }

    static register(req,res,next){
        User.create({
            fullname: req.body.fullname,
            profilePicture : req.body.file,
            email:req.body.email,
            password : PasswordHasher(req.body.password),
        })
        .then(user => {
            let payloads = {
                _id : user.id,
                fullname : user.fullname,
                email : user.email
            }
            let token = generateToken(payloads)
            res.status(200).json({access_token : token})
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req,res,next){
        User.findOne({
            email : req.body.email
        })
        .then(user => {
            
            if(user){
                
                if(VerifyPassword(req.body.password,user.password)){
                    let payloads = {
                        _id : user.id,
                        fullname : user.fullname,
                        email : user.email
                    }
                    let token = generateToken(payloads)
                    res.status(200).json({access_token : token})
                    
                }else{
                    next({
                        status : 400,
                        message : 'wrong username/password'
                    })
                }
            }else{
                next({
                    status : 400,
                    message : 'email not found'
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static googleLogin(req,res,next){
        let id_token = req.body.id_token
        let payloadJWT
        let Email
        let Fullname
        let profilePicture
        let password = process.env.DEFAULT_PASSWORD
        
        client.verifyIdToken({
            idToken :id_token,
            audience : process.env.CLIENT_ID
        })
        .then(ticket =>{
            const payloads = ticket.getPayload()
            Email = payloads.email
            Fullname = payloads.email.split('@')[0]
            profilePicture = payloads.picture

            return User.findOne({email:Email})
        })
        .then(user => {
            if(user){
                payloadJWT = {
                    _id : user.id,
                    fullname : user.fullname,
                    email : user.email
                }
                let token = generateToken(payloadJWT)
                res.status(200).json({access_token : token})
            }else{
                let defaultName = `${req.body.name.split(' ')[0]}+${req.body.name.split(' ')[1]}`
                User.create({
                    fullname: Fullname,
                    profilePicture : profilePicture || `https://ui-avatars.com/api/?name=${defaultName}`,
                    email: Email,
                    password : password
                })
                .then(newUser => {
                    payloadJWT = {
                        _id : newUser.id,
                        fullname : newUser.fullname,
                        email : newUser.email
                    }
                    let token = generateToken(payloadJWT)
                    res.status(200).json({access_token : token})
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController