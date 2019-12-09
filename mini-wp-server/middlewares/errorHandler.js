"use strict"

'use strict'

module.exports = {
  
  errorHandler: function(err, req, res, next) {
    console.log(err)
    let status = null
    let message = null

    if (err.name === 'JsonWebTokenError') {
      status = 401
      message = 'Please login first, you are not logged in yet!'
    } else if (err.name === 'TokenExpiredError') {
      status = 401
      message = 'Your session is already expired! Please login again'
    } else if (err.name === 'ValidationError') {
      status = 400
      const arr = []
      for (const key in err.errors) {
        arr.push(err.errors[key].message)
      }
      message = arr
    } else {
      status = err.status || 500
      message = err.message || 'Internal Server Error'
    }
    res.status(status).json(message)
  }
}