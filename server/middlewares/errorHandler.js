function errorHandler(err, req, res, next){
    if(err.code == 11000){
        err.code = 400;
        err.msg = 'duplicate email or username'
    }
    let error = err.msg || err.message
    console.log(err)
    res.status(err.code || 500).json({message:error})
}

module.exports = errorHandler