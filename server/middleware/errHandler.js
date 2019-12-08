const errHandler = (err, req, res, next) => {
    let errCode = 0;
    let msg = "";

    if (err.message) err = err.message.split(': ')[2];

    switch (true) {
        case "Data is empty":
            msg = err;
            errCode = 200;
            break;
        case "You don't have the authorization to do this action !!!":
            msg = err;
            errCode = 401;
            break;
        case "is not a valid email!!!":
            msg = err;
            errCode = 400;
            break;
        case /registered/.test(err):
            msg = err;
            errCode = 400;
            break;
        case /required/.test(err):
            msg = err;
            errCode = 400;
            break;
        case /not found/.test(err):
            msg = err;
            errCode = 404;
            break;
    }

    console.log(err);

    res.status(errCode).json({message: msg});
    next();
};

module.exports = errHandler;