function errorHandler(err, req, res, next) {    
    let status, message, error = []
    console.log(JSON.stringify(err, null, 2))
    console.log('masuk error', err)

    if (err.name === 'ValidationError') {
        status = 400
        for (let key in err.errors) {
            error.push(err.errors[key].message)
        }
    } else {
        status = err.status || 500
        error.push(err.message)
    }

    res.status(status).json({error})

}

module.exports = errorHandler