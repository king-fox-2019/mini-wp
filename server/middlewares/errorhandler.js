let status = null,
    message = ''


function errorHandler(err, req, res, next) {
    if(process.env.NODE_ENV === 'development'){
        console.log(err)
    }
    switch(err.name) {
        case "ValidationError": {
            status = 400
            message = err.message
            break
        }
        default: {
            status = err.status || 500
            message = err.message || "Internal server error"
        }
    }
    res.status(status).json({ message })
}

module.exports = errorHandler;