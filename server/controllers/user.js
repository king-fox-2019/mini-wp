const User = require('../models/User');
const bcrypt = require('../helpers/bcrypt');
const session = require('../helpers/session');

class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body;
        User.findOne({
            email
        })
            .then(user => {
                if (!req.body.password) {
                    let err = {
                        status: 400,
                        msg: "Password should not be empty."
                    }
                    next(err);
                }

                if (user) {
                    let err = {
                        status: 400,
                        msg: "Email user is already registered!"
                    }
                    next(err);

                } else {
                    User
                    .create({
                        name,
                        email,
                        password
                    })
                    .then( data => {
                        let token = session.encode({id: data.id, email: data.email});
                        res.status(200).json({
                            token,
                            name: data.name,
                            email: data.email
                        });
                    })
                    .catch( err => {
                        next(err);
                    })
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User
            .findOne({
                email
            })
            .then( user => {
                if (!req.body.email || !req.body.password) {
                    let err = {
                        status: 400,
                        msg: 'Bad Request'
                    }
                    next(err);
                }
                if(user) {
                    if (bcrypt.compare(password, user.password)) {
                        let token = session.encode({id: user.id, email: user.email});
                        res.status(200).json({
                            token,
                            name: user.name,
                            email: user.email
                        });
                    } else {
                        let err = {
                            status: 404,
                            msg: 'Invalid Email/Password'
                        }
                        next(err);
                    }
                } else {
                    let err = {
                        status: 404,
                        msg: 'Invalid Email/Password'
                    }
                    next(err);
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static googleSign(req, res, next) {
        const { gProfile } = req.body;
        User
            .find({
                email: gProfile.U3
            })
            .then( user => {
                if (user) {
                    let token = session.encode({id: user[0].id, email: user[0].email});
                    res.status(200).json(token);
                } else {
                    User
                        .create({
                            name: gProfile.ig,
                            email: gProfile.wea
                        })
                        .then( data => {
                            res.status(201).json(data);
                        })
                        .catch( err => {
                            next(err);
                        })
                }
            })
            .catch( err => {
                next(err);
            })
    }
}

module.exports = UserController;