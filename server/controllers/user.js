'use strict';
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { hash, compare } = require('../helpers/bcryptjs');
const jwt = require('../helpers/jsonwebtoken');

const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
    static register(req, res, next) {
        let { fullname, email, password } = req.body.formValue
        if(!fullname || !email || !password) {
            console.log('masuk?')
            next({
                isThrow: true,
                status: 400,
                message: 'Please fill all fields!'
            })
        } else {
            let data = {
                fullname,
                email,
                password
            }
            User
                .create(data)
                .then(result=> {
                    res.status(201).json(result)
                })
                .catch(next)
        }
    }
    static loginAttempt(req, res, next) {
        let { email, password } = req.body
        User
            .findOne( { email } )
            .then(user=> {
                if(!user) {
                    throw new Error({ isThrow: true, status: 400, message: "Wrong email / password" })
                } else {
                    if(compare(password, user.password)) {
                        const payload = {
                            id: user._id,
                            name: user.fullname
                        }
                        const token = jwt.sign(payload)
                        res.status(200).json({token})
                    } else {
                        throw new Error({ isThrow: true, status: 400, message: "Wrong email / password" })
                    }
                }
            })
            .catch(next)
    }
    static google(req, res, next) {
        console.log('masuk?')
        let token = req.body.idToken
        console.log(token)
    }
}

module.exports = UserController;