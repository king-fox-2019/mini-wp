function errorHandler(err, req, res, next){
    console.log(err)
    res.status(err.code || 500).json(err.msg || err.message)
}
module.exports = errorHandler