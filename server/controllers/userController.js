'use strict';

const modelUser = require('../models/user');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');

class userController {

    static register = (req, res, next) => {
        const registerData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        modelUser.create(registerData)
            .then(user => {
                res.status(201).json({
                    status: 'success',
                    message: 'User Registration Success!'
                })
            })
            .catch(next)
    }

    static login = (req, res, next) => {
        modelUser.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email },
            ]
        })
            .then(user => {
                if (!bcrypt.checkPassword(req.body.password, user.password)) {
                    // throw new Error('invalid username / email / password combination !!!')
                    // throw new Error('BROKEN')
                    res.status(400).json({
                        status: 'error',
                        code: 400,
                        message: 'invalid username / email / password combination !!!'
                    })
                }
                else {
                    const payload = {
                        id: user._id,
                        username: user.name,
                        email: user.email,
                    }
                    res.status(200).json({
                        status: 'success',
                        access_token: jwt.generateToken(payload)
                    })
                }
            })
            .catch(next)
    }
}

module.exports = userController;