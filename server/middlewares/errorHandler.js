'use stric';

function errorHandler(err, req, res, next) {
    // const errorResponse = {}
    switch (err.name) {
        case 'invalid username / email / password combination !!!':
            res.status(400).json({
                err
            })
            break;

        default:
            res.status(err.status || 500).json({
                status: 'error',
                message : err.message || 'Internal Server Error'
            });
            break;
    }
    // res.status(500).json(err)
}

module.exports = errorHandler;