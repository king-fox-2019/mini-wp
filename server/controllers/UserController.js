const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const Secret = process.env.SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken');
const { checkPassword } = require('../helpers/encryptPass');

class UserController{
    static create(req, res, next){
        //console.log(req.body);
        const {username ,email, password} = req.body
        
        User.create({username, email, password})
        .then(( user ) => {
            let userdata = {
                'username' : user.username,
                'id' : user._id,
                'email' : user.email
            }
            const currentUser = {
                "username" : user.username,
                "id" : User._id
            }
            let token = jwt.sign(userdata, Secret)
            res.status(201).json({ token, currentUser })
        })
        .catch(next)
    }

    static signIn(req, res, next){
        console.log('signIn dipanggil');
        console.log('req.body.idToken => ',req.body.idToken);
        client.verifyIdToken({
            idToken : req.body.idToken,
            audience : GOOGLE_CLIENT_ID
        })
            .then(( ticket ) => {
                const {email, name} = ticket.getPayload()
                
            User.findOne({ email })
            .then(( user ) => {
                if(!user){
                    return User.create({
                        'username' : name,
                        'email' : email,
                        'password' : "default"
                    })
                } else {
                    return user
                }
            })
            .then(( user ) => {
                let userdata = {
                    'username' : user.username,
                    'id' : user._id,
                    'email' : user.email
                }
                
                let token = jwt.sign(userdata,Secret)
                let currentUser = {
                    "username" : user.username,
                    "id" : User._id
                }
                currentUser = JSON.stringify(currentUser)
                res.status(200).json({ token, currentUser })       
            })
            .catch(next)   
    })
        .catch(next)
    }

    static login(req, res, next){
        const {email, password} = req.body
    
        User.findOne({ email })
        .then(( user ) => {

            if (!user){
                next({ status:404, message : "Email Not Found" })
            } else if ( checkPassword(password, user.password ) ){
                let userdata = {
                    'username' : user.username,
                    'id' : user._id,
                    'email' : user.email
                }
                let currentUser = {
                    "username" : user.username,
                    "id" : user._id
                }
                
                let token = jwt.sign(userdata,Secret)
                currentUser = JSON.stringify(currentUser)
                
                res.status(200).json({ token, currentUser })       

            } else {
                next({status:400, message : "email/password is wrong"})
            }
        })
        .catch(next)
    }
}

module.exports = UserController



