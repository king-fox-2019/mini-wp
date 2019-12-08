`use strict`

module.exports = {
    errorHandler: function (error, req, res, next) {
        // console.log(JSON.stringify(error, null, 2))
        // console.log(error)
        let statusCode;
        let messageError = [];

        switch (error.name) {
            case 'ValidationError':
                statusCode = 422;
                for (const key in error) {
                    messageError.push(error.errors[key].message)
                }
                break;
            case 'JsonWebTokenError':
                // console.log('serah');
                statusCode = 400;
                messageError = error.message;
                break;
            case 'Password incorrect':
                statusCode = 403;
                messageError = "Password incorrect"
                break;
            case 'MongoError':
                statusCode = 409;
                for (const key in error.keyValue) {
                    if (key == "email") {
                        messageError = "Email terpakai"
                        break;
                    } else if (key == "name") {
                        messageError = "Nama terpakai"
                        break;
                    } else {
                        statusCode = 500
                        messageError = "Internal Server Error"
                    }
                }
                // messageError = `${error.}`
                break;
            default:
                // console.log(error.status, 'asdasdasdasda');
                statusCode = error.status || 500;
                messageError = error.msg || 'Internal Server Error';
                break;
        }
        console.log(messageError)
        res.status(statusCode).json({
            message: messageError
        })
    }
}