function errorHandler(err, req, res, next){
  let code = err.code || 500
  let message = err.name || 'Internal Server Error'
  if (code == 11000){
    code = 500
    message = 'Validation error'
  } 
  console.log(code, message)
  res.status(code).json({message})
}

module.exports = errorHandler