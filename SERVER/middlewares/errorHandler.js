module.exports = (err, req, res, next) => {
  let errStatus = 500
  let messages = []
  console.log('err di error handler', err)

  if (err.name === 'MongoError' && err.keyPattern.email) {
    err.status = 400
    messages.push('Email address has already been used!')
  } 
  else if (err.name === 'ValidationError') {
    errStatus = 400
    let keys = Object.keys(err.errors)
  
    keys.forEach (key => {
      messages.push(err.errors[key].message)
    })
  } 
  else if (err.name === 'JsonWebTokenError') {
    errStatus = 401
    messages.push('Unauthorized access!')
  }
  else {
    errStatus = err.status 
    messages.push(err.message)
  }
  res.status(errStatus).json({ messages })
  next()
}