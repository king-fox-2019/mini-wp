const { User } = require('../models');

class UserController {
    static register(req, res, next) {
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
                console.log('berhasil')
                res.status(201).json(result)
            })
            .catch(err=> {
                console.log(err)
            })
    }
}

module.exports = UserController;