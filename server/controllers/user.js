const { User } = require('../models');

class UserController {
    static register(res, req, next) {
        let { fullname, email, password } = req.body
        console.log(fullname, email, password)
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
            .err(err=> {
                console.log(err)
            })
    }
}

module.exports = UserController;