function errorHandling(err, req, res, next) {
    console.log(err.message);
    
    // default error
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'
    const errors = []

    if (err.name === 'ValidationError') {
        // error validation
        for (key in err.errors) {
            errors.push(err.errors[key].message)
        }
        res.status(400).json({
            message: 'Validation Error',
            errors
        })
    } else if (err.name === 'CastError') {
        // error CastObjectId
        res.status(404).json({
            message: 'Id Not Found',
        })
    } else if (err.name === 'JsonWebTokenError') {
        // error token
        errors.push(message)
        res.status(401).json({
            message: 'Json Web Token Error',
            errors
        })
    } else if (err.message === 'Not Found') {
        // error token
        errors.push(message)
        res.status(404).json({
            message: 'Invalid Input',
            errors
        })
    } else if (err.name === 'MongoError' && err.code === 11000) {
        for (var key in err.keyPattern) {
            errors.push(key + ' is Already Exist')
        }
        res.status(400).json({
            message: 'Validation Error',
            errors
        })
    } else if (err.name === 'TypeError') {
        errors.push(message)
        res.status(400).json({
            message: 'Validation Error',
            errors
        })
        err.name
    } else {
        if (status == 500) {
            res.status(500).json({
                message : "Internal Server Error"
            })
        }

        errors.push(message)
        res.status(status).json({
            message : message,
            errors
        })
    }
}

module.exports = errorHandling
