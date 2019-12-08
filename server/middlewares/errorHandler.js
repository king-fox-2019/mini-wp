module.exports = (err, req, res, next) => {
  console.log(err)
  let status, message

  switch (err.name) {
    case 'ValidationError':
      status = 422
      message = []
      for (const path in err.errors) {
        message.push(err.errors[path].message)
      }
      break
    case 'JsonWebTokenError':
      status = 401
      message = 'Valid access token required'
      break

    default:
      status = err.status || 500
      message = err.message || 'Internal server error'
      break
  }

  res.status(status).json({ message })
}
