function errorHandler(err,req,res,next){
  if(err.name && err.message){
    res.json({name:err.name,message:err.message})
  }
  else res.json({name:500,message:`internal server error`})
}

module.exports = errorHandler