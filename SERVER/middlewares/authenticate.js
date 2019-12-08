const User = require('../models/User')
const { verifyToken } = require('../helpers/jwt')

module.exports = async(req, res, next) => {
  try {
    const { access_token } = req.headers
    const decoded = verifyToken(access_token, next)

    if (!decoded) {
      throw {
        name: 'Unauthorized',
        status: 401,
        message: 'Unauthorized access!'
      }
    }
    // console.log('ini decoded', decoded)
    let user = await User.findOne({ email: decoded.email })

    if (!user) {
      throw {
        name: 'Unauthorized',
        status: 401,
        message: 'Unauthorized access!'
      }
    }
    req.loggedUser = { 
      id: user._id, name: decoded.name, email: decoded.email 
    }
    next()
  }
  catch (err) {
    next(err)
  }
}