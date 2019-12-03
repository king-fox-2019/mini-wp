function errorHandler(err,req,res,next){
    if(err.name && err.message){
        res.json({name:err.name,message:err.message})
    }else{
        res.json({code:500,message:'Internal server error.'})
    }
}

module.exports = errorHandler