'use stric';

function errorHandler(err, req, res, next){
    const errorResponse = {}
    switch (err.name) {
        case 'asdasd':
            
            break;
    
        default:
            errorResponse.status = 'error';
            errorResponse.code = '500';
            errorResponse.message = 'Internal Server Error'
            res.status(500).json(errorResponse);
            break;
    }
}

module.exports = errorHandler;