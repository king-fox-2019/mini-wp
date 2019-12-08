module.exports= (err,req,res,next)=>{

    console.log(`
        LOG FROM ERROR HANDLER
        ========================
        ${err.message}
    `)
    console.log(err)  
    
    let status
    let message

    switch (err.name) {
        case 'ValidationError':
            status = 404
            message = err.message
            break;
    
        case 'MongoError':
            status = 404
            message = ' has already been used'
            if(err.keyPattern.username)
                message = 'username' + message
            else if(err.keyPattern.email)
                message = 'email' + message
            break

        default:
            status = err.status || 500
            message = err.message || 'INTERNAL SERVER ERROR'
            break;
    }


    res
    .status(status)
    .json({
        code:status,
        message
    })


}