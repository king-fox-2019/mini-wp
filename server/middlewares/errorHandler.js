module.exports = (err,req,res,next)=>{
    console.log(err)
    let status;
    let message;
    switch (err.name){
        case 'ValidationError':
        status = 400
        let arr = []
        let errorMessage = err.errors
        for(const data in errorMessage){
            arr.push(errorMessage[data].message)
        }
        message = arr
        break;
        default:
            status = err.status
            message = err.message
    }
    res.status(status).json({
        code: status,
        message
    })
}
