'use strict';
const { User } = require('../models');
const { hash, compare } = require('../helpers/bcryptjs');
const jwt = require('../helpers/jsonwebtoken');

class UserController {
    static register(req, res, next) {
        let { fullname, email, password } = req.body
        let data = {
            fullname,
            email,
            password
        }
        User
            .create(data)
            .then(result=> {
                console.log('berhasil')
                res.status(201).json(result)
            })
            .catch(err=> {
                console.log(err)
            })
    }
    static loginAttempt(req, res, next) {
        let { email, password } = req.body
        User
            .findOne( { email } )
            .then(user=> {
                console.log(password, user.password)
                if(compare(password, user.password)) {
                    const payload = {
                        id: user._id,
                        name: user.fullname
                    }
                    const token = jwt.sign(payload)
                    res.status(200).json(token)
                } else {
                    console.log('email / password salah!')
                }
            })
            .catch(err=> {

            })
    }
}

module.exports = UserController;