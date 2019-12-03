module.exports = (err,req,res,next)=>{
    
    console.log(`
    ERROR HAPPENED
    ==================
    ${err}
    `)


    let status
    let message

    switch (err.name) {
        case 'ValidationError':
            status= 200
            message= `Title & Content must be filled`
            break;

        case 'custom error':
            status=404
            message= err.message
            break

        default:
            status = 500
            message = 'Internal Server Error'
            break;
    }

    res.status(status)
    .json({
        code:status,
        message
    })

}  