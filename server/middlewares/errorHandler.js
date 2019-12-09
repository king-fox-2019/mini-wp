function errorHandler(err, req, res, next) {
    console.log(err);
    switch(err.name){
        case 'ValidationError':{
            err.status = 400
            break
        }
    }
    res.status(err.status || 500).json({message: err.message || "internal server error"})
}

module.exports = errorHandler